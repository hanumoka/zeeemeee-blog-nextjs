# Sebure

토이 프로젝트... 개발중

### 주의

개발시 메모리가 16기가에서 개발서버가 죽는다.
docker build시 메모리가 부족해서 빌드에 실패한다.

### 명령어메모

```
docker build -t sebure-next:0.0.1 .

docker run -d -p 3000:3000 --name sebure-next sebure-next:0.0.1
```

- 도커 이미지를 파일로 출력

```docker
# docker save [옵션] <파일명> [이미지명]

docker save -o sebure-next.tar sebure-next:0.0.1
```

- 도커 파일로 이미지 로드

```docker
# docker load -i tar파일명

docker load -i sebure-next.tar
```


```
docker run -d -p 80:3000 --name sebure-next sebure-next:0.0.1

docker run -it -p 80:3000 --name sebure-next sebure-next:0.0.1
```