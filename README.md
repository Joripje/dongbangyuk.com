## Typescript 기록



### 0. install

- `npm install typescript`
  
  - TS를 설치
- `npx create-react-app -template typescript`
  
  - 
- `npm install @type/react @type/react-dom @type/react-scripts`
  
  - 라이브러리마다 존재하는 type에 관한 설정 파일을 install한다.
  - 사용하지 않은 경우, 정상적으로 작동하지만 ESLint가 지랄한다
  
- `npm install @type/{라이브러리 이름}`
  
  - TS에선 모든 변수나 함수의 Type을 선언해야만 한다
  - 이를 위해 라이브러리마다 라이브러리가 지원하는 함수에 대한 Type을 선언한 파일을 제공함
  - 위의 코드를 통해 라이브러리의 타입을 node modules에 저장할 수 있다.
  
- tsconfing.json

  - Typescript의 속성을 결정하는 JSON 파일
  - 없을 경우 default로 실행되는데 이럴 경우 다양한 라이브러리가 비활성화된다

  - 인터넷에서 찾아온 추천 설정

    ```json
    {
      "compilerOptions": {
        "target": "es6",
        "lib": [
          "dom",
          "dom.iterable",
          "esnext"
        ], 
          // baseUrl을 ./scr로 변경하여 코드 가독성을 높임
        "baseUrl": "./src",
          // JavaScript의 사용을 허용함. 혹여나 개발에 쫓긴다면 JS로 먼저 개발하고 나중에 refactor해도 될듯
        "allowJs": true,
          // 위에서 말했던 라이브러리의 Type을 체크하지 않는다. 코드는 돌아가지만 ESLint에서 에러를 토해냄
        "skipLibCheck": true,
          // Default imports를 가능케 해주는 설정
        "esModuleInterop": true,
        "allowSyntheticDefaultImports": true,
          // 이거 false하면 인생이 편하지지만, 그럼 타스 쓸 필요 없음
        "strict": true,
          // 파일의 일관성 유지를 위해 함수나 컴포넌트의 대소문자 민감성을 추가
        "forceConsistentCasingInFileNames": true,
          // switch - case구문에서 break를 사용하지 않았을 경우 오류를 발생
        "noFallthroughCasesInSwitch": true,
        "module": "esnext",
        "moduleResolution": "node",
        "resolveJsonModule": true,
        "isolatedModules": true,
        "noEmit": true,
        "jsx": "react-jsx"
      },
      "include": [
        "src"
      ],
    }
    ```
  
  - esModuleInterop, allowSyntheticDefaultImports
  
    ```
    // module.js
    export function foo() { /* ... */ }
    
    // index.js
    import module from './module.js';
    
    module.foo();
    ```
  
    module.js에서 선언한 함수 foo를  Default imports로 활용할 수 있게 할지 말지 여부를 결정하는 설정

---



### 1. 사용

- 타입의 선언

  - 모든 함수, 변수의 타입을 선언해야 한다.

  - 예시

    ```typescript
    // 변수
    const destinations: number[] = [1, 2, 3, 1, 2, 3];
    
    // 함수
    const getRandomNumber = (): [number, number] => {
        return [0, 0]
    }
    // 복합적인 선언
    const destinations: (number | string)[] = [1, 2, '3', 1, '2', 3];
    
    // 객체 - interface를 통해 선언
    interface Problem {
      id: number;
      items: number[][];
      answer: number;
    }
    
     const initialProblem: Problem = {
       id: 1,
       items: [[0, 0 , 0], [1, 1, 1]],
      answer: 3,
    };
    
    // 객체 - inline으로 선언
    const initialProblem: { id: number; items: number[][]; answer: number } = {
      id: 1,
      items: [[0, 0 , 0], [1, 1, 1]],
      answer: 3,
    };
    ```

  - styled-coponents와 함께한 예시

    ```typescript
    // styled-components로 component 선언과 사용
    interface EmptyBoxProps {
      children: ReactNode;
      attribute: number;
      key: number;
    }
    
    const EmptyBox: React.ComponentType<EmptyBoxProps> = styled.div<EmptyBoxProps>`
      background: ${(props: EmptyBoxProps) => {
    	// attribute를 사용하는 코드
      }};
    
        <EmptyBox attribute={rowValue} key={xIndex}>
          <LeftTopDiagonal
            attribute={rowValue}
            xIndex={xIndex}
            yIndex={yIndex}
            onClick={(event: MouseEvent) =>
              onClickHandler(event, xIndex, yIndex, 4)
            }
          />
          <RightTopDiagonal
            attribute={rowValue}
            xIndex={xIndex}
            yIndex={yIndex}
            onClick={(event: MouseEvent) =>
              onClickHandler(event, xIndex, yIndex, 5)
            }
          />
        </EmptyBox>
    ```

    
