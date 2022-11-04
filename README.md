# 비밀번호를 베이스로 하는 게시판 API

# 프로젝트

비밀번호를 기반으로 운영되는 게시판입니다. 유저가 회원가입과 로그인없이 게시글을 작성할 수 있습니다. 게시글에는 비밀번호를 걸며 비밀번호가 맞으면 게시글을 수정 삭제 할 수 있습니다.

# 구현사항

1. 사용자는 게시글을 작성
   - 게시글은 제목과 본문으로 구성
   - 제목은 최대 20자, 본문은 200자로 서버에서 제한
   - 제목과 본문 모두 이모지가 포함
2. 게시글 작성 시 비밀번호를 설정
   - 회원가입, 로그인 없이 비밀번호만 일치하면 수정, 삭제
   - 비밀번호 암호화 저장
   - 비밀번호는 6자 이상, 숫자 1개 이상 반드시 포함
3. 게시글 최신 글 순서로 확인
4. 게시글에 날씨 추가
   - [https://www.weatherapi.com](https://www.weatherapi.com/)에서 Real-time Weather API 사용
   - API_Key .env저장
   - 게시글 작성시 자동으로 데이터베이스에 날씨 저장

# API 문서

[swagger](http://localhost:3000/api-docs/#/)

<img width="1478" alt="스크린샷 2022-11-04 18 41 16" src="https://user-images.githubusercontent.com/105622759/199942372-81b4a9a9-9e90-45d8-a543-6a576fc31c30.png">

# 테스트

<img width="885" alt="스크린샷 2022-11-04 18 42 12" src="https://user-images.githubusercontent.com/105622759/199942377-c952198d-f1a2-455f-af10-f58225b9c8e7.png">
