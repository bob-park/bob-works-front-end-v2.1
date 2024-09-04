# Bob Works Front End

Bob Works 의 웹페이지이다.

## Build

build 는 `Docker` 를 사용하여 `Container Image` 로 build 하며 방법은 아래와 같다.

### docker

### platform

- linux/amd64
- linux/arm64

```shell
docker buildx bake --push --pull
```

## 필요 파일

* `.npmrc`

`eslint`, `prettier` 설정을 github package 를 사용하기 때문에, github package registry 설정을 추가해주어야 한다.

```npmrc
@bob-park:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken={{github_access_token}}
```
