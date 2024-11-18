import requests
from bs4 import BeautifulSoup

# URL 지정
url = "https://ko.wikipedia.org/wiki/%EA%B0%80%EB%82%98"

# HTTP 요청
response = requests.get(url)

# 요청 성공 여부 확인
if response.status_code == 200:
    # BeautifulSoup 객체 생성
    soup = BeautifulSoup(response.text, 'html.parser')

    # 본문 내용에서 모든 <p> 태그 선택
    paragraphs = soup.select('div.mw-parser-output > p')

    # 두 번째 <p> 태그 선택
    if len(paragraphs) > 1:  # 두 번째 <p>가 있는지 확인
        second_paragraph = paragraphs[1]

        # <sup> 태그 제거
        for sup in second_paragraph.find_all('sup'):
            sup.decompose()

        # 텍스트 출력
        print(second_paragraph.get_text(strip=True))
    else:
        print("본문에서 두 번째 <p> 태그를 찾을 수 없습니다.")
else:
    print(f"HTTP 요청 실패: {response.status_code}")
