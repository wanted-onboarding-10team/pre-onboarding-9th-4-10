## 원티드 프리온보딩 FE 인턴십 4주차 과제

원티드 프리온보딩 FE 인턴십 4주차 과제물 입니다.

스위치원 브랜드의 기업 과제를 진행하였습니다.

작업 기간 : 3/19 ~ 3/22 (4일간 진행)

### 🌟Preview

| 메인 페이지 | 필터링 후 메인 페이지 |
| ----------- | --------------------- |
|             |                       |

### 📝Contents

### 배포 링크

https://pre-onboarding-9th-3-10.vercel.app/

### 실행 방법

```jsx
$ git clone https://github.com/wanted-onboarding-10team/pre-onboarding-9th-4-10.git
$ npm i
$ npm start
```

### 사용 기술 스택

<div display=flex>
<!--React-->
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
<!--Typescript-->
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">
<!--React Router-->
<img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=React Router&logoColor=white">
<!--Axios-->
<img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white">
</div>
  
<br />

<div display=flex>
<!--eslint-->
<img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=ESLint&logoColor=white">
<!--prettier-->
<img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=Prettier&logoColor=white">
<!--husky-->
<img src="https://img.shields.io/badge/HUSKY-000000?style=for-the-badge&logo=&logoColor=white" />
</div>

<br />

<div display=flex>
<!-- GitHub -->
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white">
<!-- Notion -->
<img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white">
<!-- Figma -->
<img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white">
</div>

### 파일 구조

```jsx
📦
├─ public
│  ├─ data
├─ src
│  ├─ assets
│  ├─ components
│  │  ├─ common
│  ├─ pages
│  ├─ utils
│  ├─ index.js
└─ └─ App.js
```

## ✅ Team Rules

### 1. 커밋 컨벤션

| feature  | 새로운 기능 추가              |
| -------- | ----------------------------- |
| fix      | 버그 수정                     |
| docs     | 문서 수정                     |
| refactor | 코드 리팩토링                 |
| style    | 스타일 변경                   |
| chore    | 패키지 설치 및 빌드 부분 수정 |

자세한 사항은 `.gitmessage.txt` 에서 확인 가능합니다

### 2. Git Flow

1. 더욱 자유로운 환경에서 개발을 시도해 보기 위함

2. 브랜치 관리를 더욱 깔끔하게 하기 위함

```jsx
- main : 배포 브랜치
	- develop : 개발 브랜치
		- feature/#[이슈번호] : 각 기능을 개발하는 브랜치
			- feature/#[이슈번호]-팀원이름
```

### 3. Prettier

```jsx
// .prettierrc
{
  "printWidth": 100,
  "singleQuote": true,
  "arrowParens": "avoid",
  "semi": true,
  "tabWidth": 2,
  "endOfLine": "auto",
  "trailingComma": "all",
  "useTabs": false,
  "bracketSpacing": true,
  "jsxSingleQuote": true
}
```

### 4. EsLint

```jsx
// .eslintrc
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  "overrides": [],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "plugins": ["react", "@typescript-eslint", "import"],
  "rules": {
    "no-var": "error",
    "prettier/prettier": "error",
    "no-multiple-empty-lines": "error",
    "no-console": [
      "warn",
      {
        "allow": ["warn", "error", "info"]
      }
    ],
    "dot-notation": "error",
    "eqeqeq": "error",
    "no-unused-vars": "warn",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
```

### 👏 협업 방법

주된 커뮤니케이션 툴로 [팀 노션 페이지](https://www.notion.so/89a35a261c6948f4846fc3d3dc6ae582)와 Discord, [Figma](https://www.figma.com/file/LnyJLz3bY48lhIByKNDWpf/Week-3-Project-%3A-%ED%94%8C%EB%A0%89%EC%8B%9C%EC%8A%A4?t=nBw8mR8U8cA1gwwH-0)를 사용했습니다.

1. 기능별로 팀원 개개인의 코드 리뷰

2. 토론을 통해 Best Practice 선정

- **[노션 페이지](https://www.notion.so/Team-Project-Template-da0f0a1c78c94ce7b872b8a1b7457cf4) / [Figma](https://www.figma.com/files/team/1214837984250311510/Wanted-FE-Internship?fuid=1115242331888961230)**

  - 회의를 통해 팀원들의 코드를 분석하고, 그 중에서 Best Practice 정하고, commit message convention, git flow 전략 등 Team Rules를 정하기 위해 활용

- **Discord**

  - 팀원들의 의사소통 및 화면 공유를 통한 협업을 위해 활용

### 🌟 프로젝트 진행 과정

**Issue**와 **PR**을 통해 코드 리뷰를 진행하며 프로젝트를 진행하였습니다.

Issue를 정의하고 하루에 한가지의 이슈를 다같이 진행한 후 피드백하는 식으로 동료 협업을 진행하였습니다.

---

## [Issue](https://github.com/wanted-onboarding-10team/pre-onboarding-9th-4-10/issues)

---

**주요 논점**

### 참여 멤버

|                                박수완                                |                                  유시온                                  |                                 이새미                                  |                                한동룡                                 |                                 홍수민                                 |                               황서영                                |
| :------------------------------------------------------------------: | :----------------------------------------------------------------------: | :---------------------------------------------------------------------: | :-------------------------------------------------------------------: | :--------------------------------------------------------------------: | :-----------------------------------------------------------------: |
|                [@skdoqj ](https://github.com/skdoqj)                 |               [@yoosion030](https://github.com/yoosion030)               |               [@shinpanda](https://github.com/shinpanda)                |                [@Ryong-E](https://github.com/Ryong-E)                 |                [@hongsoom](https://github.com/hongsoom)                |                 [@Seo0H](https://github.com/Seo0H)                  |
| <img src="https://avatars.githubusercontent.com/skdoqj" width="100"> | <img src="https://avatars.githubusercontent.com/yoosion030" width="100"> | <img src="https://avatars.githubusercontent.com/shinpanda" width="100"> | <img src="https://avatars.githubusercontent.com/Ryong-E" width="100"> | <img src="https://avatars.githubusercontent.com/hongsoom" width="100"> | <img src="https://avatars.githubusercontent.com/Seo0H" width="100"> |
