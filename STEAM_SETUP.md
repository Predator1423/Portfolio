# 스팀 실시간 연동 설정 가이드 (GitHub 처음이신 분용)

전체 흐름: **① GitHub 계정 만들기 → ② 저장소(폴더) 만들기 → ③ 파일 올리기 → ④ 비밀번호(Secrets) 등록 →
⑤ 홈페이지 켜기(Pages) → ⑥ 스팀 API 키 발급 → ⑦ 첫 실행 → ⑧ 확인**

하나씩 순서대로만 따라오시면 됩니다. 중간에 막히면 그 단계 번호만 알려주세요.

---

## ① GitHub 계정 만들기 (이미 있다면 건너뛰기)

1. https://github.com 접속
2. 오른쪽 위 **Sign up** 클릭
3. 이메일 → 비밀번호 → 사용자 이름(username) 순서로 입력하고 인증 진행
   - 사용자 이름은 나중에 홈페이지 주소(`사용자이름.github.io`)에 그대로 들어가니 원하는 걸로 정하세요
4. 이메일 인증 코드 입력하면 가입 완료

---

## ② 저장소(repository) 만들기

"저장소"는 파일들을 담아두는 폴더라고 생각하시면 됩니다.

1. 로그인 후 오른쪽 위 **+** 버튼 → **New repository** 클릭
2. **Repository name** 입력 (예: `portfolio`, `my-game-design-site` 등 영문/숫자/하이픈만)
3. **Public** 선택 (Private을 고르면 무료 GitHub Pages가 안 켜져요)
4. 아래 "Add a README file" 등은 **체크하지 않고** 그대로 두기
5. **Create repository** 클릭

이제 빈 저장소 페이지가 생겼을 거예요.

---

## ③ 파일 올리기

Git 명령어 없이 **웹사이트에서 마우스로 끌어다 놓기**로 올릴 수 있어요.

### 3-1. 먼저 숨김 파일이 보이게 설정하기 (딱 한 번만)

제가 드린 파일 중 `.github` 폴더는 이름이 점(.)으로 시작해서 컴퓨터에서 기본적으로 안 보일 수 있어요. 아래처럼 잠깐 켜주세요.

- **Windows**: 파일 탐색기 → 위쪽 메뉴 **보기(View)** → **표시(Show)** → **숨긴 항목(Hidden items)** 체크
- **Mac**: Finder에서 파일이 있는 폴더를 열고 `Cmd + Shift + .`(마침표) 누르기

### 3-2. 업로드

1. 저장소 페이지에서 **Add file** 버튼 → **Upload files** 클릭
2. 제가 드린 파일들이 들어있는 폴더를 열어서, 안에 있는 **모든 파일과 폴더를 전체 선택**한 뒤
   (index.html, playlog.html, steam-data.json, scripts 폴더, .github 폴더, STEAM_SETUP.md 전부)
   브라우저 화면의 점선 박스 영역으로 **통째로 드래그 앤 드롭**
   - ⚠️ 폴더 "안"에 있는 항목들을 옮기는 거예요. 폴더 자체를 담은 상위 폴더를 올리면 경로가 한 단계 밀려서 작동하지 않아요.
3. 업로드 목록에 `.github/workflows/update-steam.yml`, `scripts/fetch-steam.mjs`까지 폴더 구조 그대로 보이는지 확인
4. 아래 **Commit changes** 버튼 클릭 (커밋 메시지는 기본값 그대로 둬도 됩니다)

업로드가 끝나면 저장소 페이지에 파일 목록이 쭉 보일 거예요.

---

## ④ 비밀 값(Secrets) 등록

스팀 API 키는 코드에 넣지 않고, GitHub이 안전하게 보관해주는 곳에 넣어요.

1. 저장소 상단 메뉴에서 **Settings** 클릭 (톱니바퀴 아이콘)
2. 왼쪽 메뉴에서 **Secrets and variables** 클릭 → **Actions** 클릭
3. **New repository secret** 버튼 클릭
4. Name 칸에 `STEAM_API_KEY` 입력, Secret 칸에 발급받은 키 붙여넣기 → **Add secret**
5. 다시 **New repository secret** 클릭 → Name에 `STEAM_ID`, Secret에 본인 SteamID64(17자리 숫자) 입력 → **Add secret**

(API 키와 SteamID64를 아직 안 받으셨다면 아래 ⑥번부터 먼저 하셔도 됩니다.)

---

## ⑤ GitHub Pages 켜기 (홈페이지로 공개하기)

1. 저장소 **Settings** → 왼쪽 메뉴에서 **Pages** 클릭
2. **Build and deployment** 아래 **Branch** 부분에서 `main` 선택 (폴더는 `/ (root)` 그대로) → **Save**
3. 몇 분 기다리면 페이지 상단에 초록색으로
   `Your site is live at https://사용자이름.github.io/저장소이름/` 이라는 문구가 떠요
4. 그 주소가 실제 홈페이지 주소예요. `https://사용자이름.github.io/저장소이름/playlog.html`로 들어가면 플레이 이력 페이지가 보입니다

---

## ⑥ 스팀 프로필 공개 + API 키 발급 + SteamID 확인

1. **프로필 공개**: 스팀 클라이언트(또는 웹) → 설정 → 개인정보 → **"게임 세부정보"를 공개**로 변경
2. **API 키 발급**: https://steamcommunity.com/dev/apikey 접속 → 로그인 → 도메인 이름은 아무거나 입력(예: `github.com`) → 키 발급받아 복사
3. **SteamID64 확인**: https://steamid.io 접속 → 본인 스팀 프로필 주소 붙여넣기 → **steamID64**(17자리 숫자) 복사

이 두 값을 위 ④번의 `STEAM_API_KEY`, `STEAM_ID`에 각각 넣어주세요.

---

## ⑦ 첫 실행 (수동으로 한 번 돌리기)

1. 저장소 상단 메뉴에서 **Actions** 클릭
2. 왼쪽 목록에서 **Update Steam playtime data** 클릭
3. 오른쪽의 **Run workflow** 버튼 → 다시 한번 초록색 **Run workflow** 버튼 클릭
4. 몇 초~1분 후 새로고침하면 노란 점 → 초록 체크 표시로 바뀌어요 (성공)
   - 빨간 X가 뜨면 로그를 눌러서 어떤 오류인지 확인 (대부분 API 키/SteamID 오타)

성공하면 저장소의 `steam-data.json` 파일 내용이 실제 데이터로 자동 갱신돼요.
이후로는 **3시간마다 자동으로** 이 과정이 반복됩니다.

---

## ⑧ 최종 확인

`https://사용자이름.github.io/저장소이름/playlog.html` 접속 → 상단 "실시간 스팀 현황" 패널에
누적 플레이 시간, 최근 2주 플레이, 현재 상태가 뜨면 완료예요.

---

## 자주 막히는 부분

| 증상 | 원인 / 해결 |
|---|---|
| "steam-data.json이 없어요" 문구 | ⑤(Pages 켜기) 또는 ⑦(첫 실행)을 아직 안 한 상태 |
| "공개로 바꿔주세요" 문구 | ⑥-1 프로필 공개 설정을 다시 확인 |
| Actions가 빨간 X | STEAM_API_KEY / STEAM_ID를 잘못 입력했을 가능성 → ④번 다시 확인 후 ⑦ 재실행 |
| 페이지 자체가 404 | ⑤번 Pages 설정에서 몇 분 더 기다리거나, 주소에 저장소 이름이 빠지지 않았는지 확인 |
| .github 폴더가 안 올라감 | 3-1 숨김 파일 보이기 설정을 먼저 했는지 확인 |

막히는 단계 번호랑 화면 캡처 보여주시면 바로 봐드릴게요.
