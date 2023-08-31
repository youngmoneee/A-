# A- Beta v0.1

<img width=50% src="https://github.com/youngmoneee/A-/assets/79129960/0d183115-0e85-43b8-bf2a-be9c385d6c33" />

---
## Intro

- 무더운 여름
- 집에 빨래를 널어놓고 나왔고,
- 바깥 온도는 34도.
- 집에는 아무도 없고,
- 운동 후 집에 들어가는 길..

집에 들어갔더니 바깥보다 더 습하고, 덥다?  
  
에어컨을 키고 다니자니  
<img width=30% src="https://github.com/youngmoneee/A-/assets/79129960/6ad7c702-2962-4d15-9410-aeb7b39e5c56" /> ..  
에어컨을 끄고 다니자니  
집이 너무 덥고 집에서 키우는 식물들이 시들시들..

**에어컨을 원격으로 제어할 수 있으면 좋을텐데**
그런 기능이 내장된 에어컨이나 인버터형은 너무 비싸고, 자취방이라 내 마음대로 달 수 없어서 !!
만들었습니다.

### 기능

- 디바이스의 센서를 통해 수집된 온/습도 데이터가 차트로 표시되어 변화 추이를 실시간으로 확인 가능  
  > **예시**
  > <img width="300" src="https://github.com/youngmoneee/A-/assets/79129960/675f0960-90a8-4c4e-a632-b1f9414760e7">  
  
- 적외선 송신 센서를 통해 외부에서도 에어컨 전원을 제어 가능
- 내가 방금 껐는데, 너가 켰어? 접속 중인 유저끼리 대화할 수 있는 채팅 기능


---
## 💨 [ 배포 페이지 바로가기 ](https://iot.youngmon.app)

_로그인은 Kakao, Google을 통해 진행 가능합니다._  
실제 디바이스와 연결되는 만큼, 직접 기기에 대한 제어는 불가능합니다.
> 구성 시 부품 비용 7000원 정도 소요되며, 디바이스 세팅을 위한 외부 레포지토리는 다음과 같습니다.  
> [IR Controller with Esp8266](https://github.com/youngmoneee/esp8266-dht11)
>
> 버그 발견 시, 페이지를 통해 버그를 제보하면 해당 깃 레포지토리에 이슈로 등록됩니다.
> 서비스 제작에 기여해주세요 ⭐️

---
## [📖 REST API DOCS](https://iot.youngmon.app/api)

외부에서 API를 사용하기 위한 REST API에 대한 문서입니다.  
인증은 Bearer Token을 사용하고 있으며, 로그인 후 서버로부터의 응답을 통해 토큰을 얻을 수 있습니다.  

---
## 시작 가이드

### Oauth 서비스  

#### Kakao Client ID 생성
1. https://developers.kakao.com/console/app/에서 프로젝트 생성
2. 카카오 로그인 활성화
3. Redirect URI 등록
4. 카카오 로그인 동의항목에서 닉네임, 프로필 사진, 이메일 설정
5. 요약 정보의 REST API 키, Secret 환경 변수에 등록  
  
#### Google Client ID 생성
1. https://console.cloud.google.com/apis/credentials에서 프로젝트 생성
2. 사용자 인증정보 -> 사용자 인증 정보 만들기 -> Oauth 클라이언트 ID 만들기
3. Redirect URI 등록
4. REST API 키, Secret 환경 변수에 등록  
  
### 환경 변수 설정

``` .env
NODE_ENV=prod

FE_HOST='frontend'
FE_PORT=8080
BE_HOST='backend'
BE_PORT=3000
DEBUG=false

# Database
POSTGRES_USER=DB 유저네임
POSTGRES_PASSWORD=DB 유저 패스워드
POSTGRES_DB=데이터베이스명


# Auth
G_AUTH_URI=https://accounts.google.com/o/oauth2/v2/auth
G_CLIENT_ID=생성된 구글 Client ID
G_SECRET=생성된 구글 Secret
G_CALLBACK=등록한 Redirect URI for Google API

K_AUTH_URI=https://kauth.kakao.com/oauth/authorize
K_CLIENT_ID=생성된 카카오 Client ID
K_SECRET=생성된 카카오 Secret
K_CALLBACK=등록한 Redirect URI for Kakao API

VUE_APP_G_AUTH_URI=$G_AUTH_URI
VUE_APP_K_AUTH_URI=$K_AUTH_URI

VUE_APP_G_CLIENT_ID=$G_CLIENT_ID
VUE_APP_K_CLIENT_ID=$K_CLIENT_ID

VUE_APP_G_CALLBACK=$G_CALLBACK
VUE_APP_K_CALLBACK=$K_CALLBACK


# Backend
DATABASE_URL="postgresql://DB_USERNAME:DB_PASSWORD@DB_HOST:DB_PORT/DB_DATABASE"

DB_HOST=database
DB_PORT=5432
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=

JWT_SECRET=JWT 해싱에 필요한 임의의 값 입력
JWT_EXPIRES_IN=토큰 만료 기간
JWT_TOKEN=accessToken

MONGO_HOST=mongo
MONGO_PORT=27017

MQTT_HOST=mosquitto
MQTT_PORT=1883

UPLOAD_DEST=uploads/chat

GH_REPO_URI=깃허브 레포지토리 URI
GH_PERSONAL_KEY=깃허브 Personal Token
```

### 실행

``` bash
git clone https://github.com/youngmoneee/A-.git
cd A-
docker-compose -f prod.docker-compose.yml up
```
---  
## 사용 기술 스택
<div align="center">
<h4>Tools</h4>
<img src="https://img.shields.io/badge/webstorm-000000?style=for-the-badge&logo=webstorm&logoColor=white">
<img src="https://img.shields.io/badge/vim-019733?style=for-the-badge&logo=vim&logoColor=white">
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
  <br/>
<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">
<img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white">
<img src="https://img.shields.io/badge/pretier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white">
<img src="https://img.shields.io/badge/swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=white">

<h4>Language</h4>
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white">
<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/C++-00599C?style=for-the-badge&logo=cplusplus&logoColor=white">

<h4>Front End</h4>
<img src="https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white">
<img src="https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white">
<img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
<img src="https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white">

<h4>Back End</h4>
<img src="https://img.shields.io/badge/nest.js-E0234E?style=for-the-badge&logo=nestjs&logoColor=white">
<img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white">
<img src="https://img.shields.io/badge/passport-334E27A?style=for-the-badge&logo=passport&logoColor=white">
<br/>
<img src="https://img.shields.io/badge/mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white">
<img src="https://img.shields.io/badge/prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white">

<h4>Database</h4>
<img src="https://img.shields.io/badge/mongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white">
<img src="https://img.shields.io/badge/postgresql-4169E1?style=for-the-badge&logo=postgresql&logoColor=white">

<h4>Device</h4>
<img src="https://img.shields.io/badge/arduino-00878F?style=for-the-badge&logo=arduino&logoColor=white">
<img src="https://img.shields.io/badge/esp-000000?style=for-the-badge&logo=esphome&logoColor=white">
<img src="https://img.shields.io/badge/eclipse mosquitto-3C5280?style=for-the-badge&logo=eclipsemosquitto&logoColor=white">

<h4>Networking Interface</h4>
<img src="https://img.shields.io/badge/http-47A248?style=for-the-badge&logo=googledocs&logoColor=white">
<img src="https://img.shields.io/badge/socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white">
<img src="https://img.shields.io/badge/mqtt-660066?style=for-the-badge&logo=mqtt&logoColor=white">

<h4>Deploy</h4>
<img src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white">
<img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white">
<img src="https://img.shields.io/badge/docker compose-0476CD?style=for-the-badge&logo=docker&logoColor=white">
<br/>
<img src="https://img.shields.io/badge/google cloud-4285F4?style=for-the-badge&logo=googlecloud&logoColor=white">
<img src="https://img.shields.io/badge/github actions-2088FF?style=for-the-badge&logo=github actions&logoColor=white">
</div>
