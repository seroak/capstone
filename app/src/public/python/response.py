
import sys
import os
import pandas as pd
from fbprophet import Prophet

# 1. 분석데이터에서 고객의 사업장에 관련된 데이터 추출하기

# 입력받은 사업장의 장소와 서비스
my_loc, my_ser = sys.argv[1:3]

# 기본경로 알아내기)
if len(os.path.split(sys.argv[0])[0]) > 0:
    root = os.path.split(sys.argv[0])[0]
else:
    root = os.getcwd()
# print(root)
# .\ml_files or D:\jupyter\캡스톤\ml_files

# 분석에 사용할 데이터
origin_df = pd.read_csv(
    f'{root}/data/서울시우리마을가게상권분석서비스_kor_2014_2021.csv', index_col=0)

# 위 데이터에서 해당 사업장의 장소와 서비스 항목만 추출
location = origin_df[origin_df.columns[5]].str.contains(my_loc)
service = origin_df[origin_df.columns[7]].str.contains(my_ser)
df = origin_df[location & service].copy()

# 데이터가 없을 경우 프로그램 종료
if df.shape[0] < 32:
    print('데이터가 없거나 부족합니다.')
    exit()


# 분석에 필요하지 않은 데이터 누락
df.drop([*df.columns[2:8], *df.columns[10:33]], axis=1, inplace=True)

# 연도 및 분기에 따라 데이터 합산
df[origin_df.columns[1]].replace(
    [1, 2, 3, 4], ['01-01', '04-01', '07-01', '10-01'], inplace=True)
df = df.groupby([origin_df.columns[0], origin_df.columns[1]]).sum()
df.reset_index(inplace=True)

# 연도와 분기를 하나의 날짜 데이터로 변환
df = df.astype({origin_df.columns[0]: 'str', origin_df.columns[1]: 'str'})
df['ds'] = df[origin_df.columns[0]].str.cat(df[origin_df.columns[1]], sep="-")
df.drop(df.columns[:2], axis=1, inplace=True)
df = df.reindex(columns=[df.columns[-1]]+[*df.columns[:-1]])

# 2. 향후 데이터 예측하기

# 결과데이터 저장경로 설정
save_dir = f'{root}/analyze_long_term_work/work_{sys.argv[1]}_{sys.argv[2]}'

# 저장경로 없으면 생성
if not os.path.isdir(save_dir):
    os.mkdir(save_dir)
if not os.path.isdir(save_dir+'/img'):
    os.mkdir(save_dir+'/img')
if not os.path.isdir(save_dir+'/forecast'):
    os.mkdir(save_dir+'/forecast')

result_df = pd.DataFrame()
for i, v in enumerate(df.columns[1:], 1):
    # 모델 생성
    m = Prophet()
    m.daily_seasonality = False
    m.weekly_seasonality = False
    m.add_seasonality(name='quarter', period=365/4, fourier_order=10)
    m.yearly_seasonality = True

    # 적용시킬 데이터
    tmp_df = pd.DataFrame()
    tmp_df['ds'] = df['ds']
    tmp_df['y'] = df[df.columns[i]]

    # 값 예측
    m.fit(tmp_df)
    future = m.make_future_dataframe(periods=4, freq='QS')
    forecast = m.predict(future)
    result_df[v] = forecast['yhat']

    # 예측 결과 저장
    forecast.to_csv(save_dir+f'/forecast/{i}_{v}.csv')

    # 이미지 저장
    m.plot(forecast).savefig(save_dir+f'/img/{i}_{v}.png')
    m.plot_components(forecast).savefig(save_dir+f'/img/{i}_{v}_component.png')

# 총 결과 저장
result_df.columns = df.columns[1:]
result_df['ds'] = forecast['ds']
result_df = result_df.astype({'ds': 'str'})
result_df['ds'] = result_df['ds'].str.replace('01-01', '1분기')
result_df['ds'] = result_df['ds'].str.replace('04-01', '2분기')
result_df['ds'] = result_df['ds'].str.replace('07-01', '3분기')
result_df['ds'] = result_df['ds'].str.replace('10-01', '4분기')
result_df = result_df.reindex(
    columns=[result_df.columns[-1]]+[*result_df.columns[:-1]])
result_df.to_csv(save_dir+'/result.csv')

print('분석에 성공하였습니다.')


# 완료를 나타내는 파일
with open(save_dir+'/completed.txt', 'w') as f:
    pass
