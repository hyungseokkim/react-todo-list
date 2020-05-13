React(TypeScript) 기초 지식
작성자 : 김형석
최초 작성일 : 2020년 5월 13일
<h1>1.	프로젝트 생성방법</h1>
create-react-app [프로젝트명] --typescirpt
<h1>2.	SRC 디렉토리</h1>
-	Index.tsx : 메인 엔트리 파일/ ReactDom.render 수행
-	Index.css : 글로벌 스타일 작성 – 프로그래밍 적으로 제한되지 않음
-	App.tsx : App 컴포넌트(샘플컴포넌트)/ 클래스이름과 파일이름 맞추기
-	App.css : App컴포넌트에서 쓰이는 스타일 => 일종의 암묵적 합의
-	App.test.tsx : App컴포넌트에 대한 테스트 작성파일
-	registerServiceWorker.ts : pwa 서비스 워커 사용등록

<h1>3.	JSX 문법<h1>
-	최상위 요소가 하나여야 한다.
-	최상위 요소 리턴하는 경우, ()로 감싸야 한다.
-	자식들을 바로 랜더링 하고싶으면, <> 자식들 </>를 사용(Fragment)
-	자바스크립트 표현식 사용 시 {표현식}을 이용(중괄호)
ex)
const component = () =>{
	<div>
		<!--<h1>-->
			{‘Hello’ + ‘world’} //자바 표현식
		<!--</h1>-->
	</div>
}

-	if 문 사용 불가 (삼항 연산자 혹은 && 사용)
ex) let a;
let(or const) a = true ? 1 : 2; //삼항 연산자의 예
// &&, || (논리 연산자의 예)
true && <p>참</p> //앞에가 true이기 때문에 뒤에 조건 확인 후 실행
false && <p>참</p> //앞에가 false이기 때문에 뒤에 조건은 확인 안하고 실행 안함

true || 실행 안됨
false || 실행 됨

ex2)
let isLoading = false;
const component = () =>(
	//로딩이면 로딩 컴포넌트
	//로딩 아니면 컨텐츠 컴포넌트
	{isLoading ? <컨텐츠/> : <로딩 />}
);

ex3)
let state = ‘LOADING’;
const component = () =>(
	//state가 ‘LOADING’이면 로딩 컴포넌트
	//state가 ‘CONTENTS’면 컨텐츠 컴포넌트…
	{state === ‘LOADING’ && <로딩 />}
	{state === ‘CONTENTS && <컨텐츠 />}
{state === ‘OTHER’ && <Other />}
);

-	Style을 이용하여 인라인 스타일링 가능
-	class 대신 className 사용하여 class 적용 가능
-	자식요소가 있으면 무조건 닫아야 하고, 자식요소가 없으면 열면서 닫아야 함
<p>~~~</p> : 자식요소가 있는 경우
<br /> : 자식요소가 없는 경우


<h1>4.	Component 생성</h1>
<h1>5.	Props, state</h1>
-props :
컴포넌트 외부에서 컴포넌트로 넣어주는 데이터(함수도 가능)
컴포넌트 내부에서는 자신의 props를 변경할 수 없다.
컴포넌트 외부에서 props 데이터 변경 시, render 다시 호출
ex)
export interface AppProps {
	name: string;
}
Interface AppState{
	age: number;
}
. . .
class App extends React.Component<AppProps, AppState>{
 . . .
}
-state :
컴포넌트 내부 데이터
클래스의 프로퍼티와는 다르다.
생성자 혹은 프로퍼티 초기할당으로 state 초기 할당 필요
ex) constructor 내부에서…
super(props);
this.state={
	age : 35
}; .  .  . 
<div>{this.state.age}</div>
.  .  . 
내부에서 변경하더라도 this.setState함수를 이용해야만 render호출 됨
<h1>6.	TypeScript 관련 사이트</h1> : https://reactjs.org/docs/static-type-checking.html#typescript
<h1>7.	React-router</h1> : 특정 주소로 접근 시 요청에 알맞는 Component로 연결
(스프링의 Controller같은 역할)
설치명령: yarn add react-router-dom @types/react-router-dom
사용예시: 
<Route path=”/” render={() =><h3>Home</h3>} />
<Route path=”/intro” render={() => <h3>소개</h3>} />
…
(정확히 특정 주소가 들어왔을 때만 해당 라우터를 실행하고 싶으면 exact={true} 옵션 필요/
위 옵션이 없을 경우 모든 라우터화면이 노출되어 버림)
