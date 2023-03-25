## 원티드 프리온보딩 FE 인턴십 4주차 과제

원티드 프리온보딩 FE 인턴십 4주차 과제물 입니다.

스위치원 브랜드의 기업 과제를 진행하였습니다.

작업 기간 : 3/19 ~ 3/22 (5일간 진행)

### 🌟Preview

| 메인 페이지 | 페이지네이션 | 정렬 | 필터링 | 검색 | 
| --- | --- | --- | --- | --- |
| <img src="https://velog.velcdn.com/images/hongsoom/post/02894bfc-7f8d-4b7e-9626-b318d0353e10/image.PNG" alt="메인 페이지" /> | <img src="https://velog.velcdn.com/images/hongsoom/post/cc905dda-7957-4514-bc95-3a8b7789cc1f/image.gif" alt="페이지네이션" /> | <img src="https://velog.velcdn.com/images/hongsoom/post/77b5ed77-4a1a-47d3-a5d8-bf9db5596e30/image.gif" alt="정렬" /> | <img src="https://velog.velcdn.com/images/hongsoom/post/e4a3fe6f-be8c-4dfa-b3e0-b3e2120d1dc1/image.gif" alt="필터링" /> | <img src="https://velog.velcdn.com/images/hongsoom/post/63b547f4-2b92-4efd-ae25-6132ccbf68fa/image.gif" alt="검색" /> |

### 📝Contents

### 배포 링크

https://pre-onboarding-9th-4-10.vercel.app/

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
├─ public
│  ├─ data 
│  └─ └─ mock_data.json
├─ src
│  ├─ __mocks__
│  ├─ __tests__
│  ├─ components 
│  │  ├─ layout 
│  │  ├─  └─ MainLayout.ts
│  │  ├─ table
│  │  ├─  └─ OrderTable.tsx
│  │  ├─  └─ Pagenation.tsx
│  │  ├─ searchTool
│  │  ├─   └─ tool
│  │  ├─       └─ SearchBar.tsx
│  │  ├─       └─ FilterButton.tsx
│  │  ├─   └─ SearchTool.tsx
│  ├─ constants
│  │  └─ page.ts
│  ├─ hooks
│  │  └─ useFilter.tsx
│  │  └─ useQuery.tsx
│  ├─ pages
│  │  └─ HomePage.tsx
│  ├─ router
│  │  └─ index.tsx
│  ├─ router 
│  │  └─ loader
│  ├─ styles 
│  │  └─ GlobalStyles.tsx
│  ├─ types 
│  │  └─ index.ts
│  ├─ index.js
└─ └─ App.js
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
			- feature/팀원이름 : 각자 전체 기능을 개발하는 브랜치
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

주된 커뮤니케이션 툴로 [팀 노션 페이지](https://www.notion.so/89a35a261c6948f4846fc3d3dc6ae582)와 Discord, Figma를 사용했습니다.

1. 기능별로 팀원 개개인의 코드 리뷰
2. 토론을 통해 Best Practice 선정
- **[노션 페이지](https://www.notion.so/Team-Project-Template-da0f0a1c78c94ce7b872b8a1b7457cf4) /** Figma
    - 회의를 통해 팀원들의 코드를 분석하고, 그 중에서 Best Practice 정하고,
    commit message convention, git flow 전략 등 Team Rules를 정하기 위해 활용
- **Discord**
    - 팀원들의 의사소통 및 화면 공유를 통한 협업을 위해 활용
- **Discord**

  - 팀원들의 의사소통 및 화면 공유를 통한 협업을 위해 활용

### 🌟 프로젝트 진행 과정

**Issue**와 **PR**을 통해 코드 리뷰를 진행하며 프로젝트를 진행하였습니다.

Issue를 정의하고 하루에 한가지의 이슈를 다같이 진행한 후 피드백하는 식으로 동료 협업을 진행하였습니다.

---

## [Issue](https://github.com/wanted-onboarding-10team/pre-onboarding-9th-4-10/issues)

| 날짜 | 제목                                                                                                      |
| ---- | --------------------------------------------------------------------------------------------------------- |
| 3/19 | [#1 개발환경 세팅 ](https://github.com/wanted-onboarding-10team/pre-onboarding-9th-4-10/issues/1)         |
|      | [#2 주문 목록 페이지 구현](https://github.com/wanted-onboarding-10team/pre-onboarding-9th-4-10/issues/2)    |
|      | [#3 정렬 / 필터링 / 검색 / 서버 주문 최신화 기능 구현](https://github.com/wanted-onboarding-10team/pre-onboarding-9th-4-10/issues/3) |
|      | [#4 컴포넌트에 대한 테스트 코드 구현](https://github.com/wanted-onboarding-10team/pre-onboarding-9th-4-10/issues/4)       |
| 3/23 | [Code refactoring](https://github.com/wanted-onboarding-10team/pre-onboarding-9th-4-10/issues) |

------

---

**주요 논점**

- **[동룡]의 코드로 선정된 이유**
    - 정말 필요한 코드만 쓰신 느낌 그래서 가독성이 굉장히 높았던 점
    - 정렬, 필터링, 검색, 페이지네이션을 쿼리 스트링으로 구현해서 새로고침해도 데이터가 유지되게 한 점
    - customHook(useFilter, useQuery)으로 관심사 분리하여 코드 가독성을 높인 점
    - 파일 구조가 가장 깔끔했던 점
    - 요구사항에 가장 충실한 작업물 (테스트 코드 구현)
    
- **요구사항을 구현함에 있어 팀원들끼리 채택한 기술**
- 필터링 구현 방법
        - 라이브러리 사용 유무(react-table) (#10)
        - query parameter vs state
	
- UI 스타일링 방법
    - styled-components(#9) vs chakra-ui(#6, #10) vs antd (#12)
    
- 데이터 최신화
    - react-query(#10) vs setinterval

**결정 사항**
- query parameter
- chakra-ui 
(styled-components로 일일이 스타일링하는 것보단 chakra-ui에서 제공하는 스타일링을 사용하기 위함.)
- setinterval

요구 사항을 만족하기 위해 최소한의 라이브러리 선정하였습니다.

- **추가 리펙토링**
    - UX 개선
    - 테스트 케이스 추가 (Veiw 관점에서)
        - axios 목킹 해보고 되면 알려주기..
        - 정렬/필터링 기능 잘 되는지
        - 50줄 보이는지
    - Input 새로고침 시 value 사라짐 수정
    - 파일 구조 및 Import 개선
    - UI 변경 (styled-components → chakra-ui)


### 참여 멤버

|                                박수완                                |                                  유시온                                  |                                 이새미                                  |                                한동룡                                 |                                 홍수민                                 |                               황서영                                |
| :------------------------------------------------------------------: | :----------------------------------------------------------------------: | :---------------------------------------------------------------------: | :-------------------------------------------------------------------: | :--------------------------------------------------------------------: | :-----------------------------------------------------------------: |
|                [@skdoqj ](https://github.com/skdoqj)                 |               [@yoosion030](https://github.com/yoosion030)               |               [@shinpanda](https://github.com/shinpanda)                |                [@Ryong-E](https://github.com/Ryong-E)                 |                [@hongsoom](https://github.com/hongsoom)                |                 [@Seo0H](https://github.com/Seo0H)                  |
| <img src="https://avatars.githubusercontent.com/skdoqj" width="100"> | <img src="https://avatars.githubusercontent.com/yoosion030" width="100"> | <img src="https://avatars.githubusercontent.com/shinpanda" width="100"> | <img src="https://avatars.githubusercontent.com/Ryong-E" width="100"> | <img src="https://avatars.githubusercontent.com/hongsoom" width="100"> | <img src="https://avatars.githubusercontent.com/Seo0H" width="100"> |
