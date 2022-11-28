import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";

const AccountPage = () => {
  const [answerActive, setAnswerActive] = useState(false);
  const [pwActive, setPwActive] = useState(false);
  const [pwCheckActive, setPwCheckActive] = useState(false);

  const [answerValue, setAnswerValue] = useState("");
  const [pwValue, setPwValue] = useState("");
  const [pwCheckValue, setPwCheckValue] = useState("");

  const [pwAble, setPwAble] = useState(2)
  const [pwCheckAble, setPwCheckAble] = useState(2)

  const [caution, setCaution] = useState(false)


  /**비밀번호 유효성 검사 */
  const pwHandler = () => {
    if (!pwActive) {

    }
    else if(pwValue.length >= 8) {
      setPwAble(1)
    }
    else {
      setPwAble(0)
    }
  }

  /**비밀번호 확인 유효성 검사 */  
  const pwCheckHandler = () => {
    if (!pwCheckActive) {
      
    }
    else if(pwCheckValue == pwValue && pwCheckValue.length >= 8) {
      setPwCheckAble(1)
    }
    else {
      setPwCheckAble(0)
    }
  }

  useEffect(()=> {
    pwHandler()
    pwCheckHandler()

  }, [pwValue, pwCheckValue])

  return (
    <>
      <Title>계정</Title>
      <Container>
        <SemiTitle>비밀번호 변경</SemiTitle>
        <Text>비밀번호 변경을 원하시면 아래 빈칸을 채워주세요.</Text>
        <Text>Q. 내가 어렸을 적 살았던 동네는 ?</Text>
        <InputContainer>
          <InputText state={answerActive}>비밀번호 변경 답변 *</InputText>
          <EmailInput
            id="answer"
            onChange={(e)=>setAnswerValue(e.target.value)}
            onFocus={() => setAnswerActive(true)}
            onBlur={() => answerValue.length > 0 ? "" : setAnswerActive(false)}
          />
        </InputContainer>
        <InputContainer>
          <InputText state={pwActive}             available={pwAble}>
            변경하실 비밀번호 (8글자 이상) *
          </InputText>
          <EmailInput
            id="pw"
            type="password"
            onChange={(e)=>setPwValue(e.target.value)}
            onFocus={() => setPwActive(true)}
            onBlur={() => pwValue.length > 0 ? "" : setPwActive(false)}
            available={pwAble}
          />
        </InputContainer>
        <InputContainer>
          <InputText state={pwCheckActive}     available={pwCheckAble}>비밀번호 확인 *</InputText>
          <EmailInput
            id="pwCheck"
            type="password"
            onChange={(e)=>setPwCheckValue(e.target.value)}
            onFocus={() => setPwCheckActive(true)}
            onBlur={() => pwCheckValue.length > 0 ? "" : setPwCheckActive(false)}
            available={pwCheckAble}
          />
        </InputContainer>
        <Button answer={answerValue.length} pw={pwAble} pwCheck={pwCheckAble}>비밀번호 변경 이메일 발송</Button>
      </Container>
      <Container>
        <SemiTitle>회원탈퇴</SemiTitle>
        <Text>회원탈퇴를 하시면 그동안 작성해 오셨던 모든 일기가 회원정보와 함께 영구적으로 삭제됩니다. 이렇게 삭제된 회원정보와 일기는 복구가 불가능 합니다. </Text>
        <Button onClick={()=>setCaution(true)}>회원탈퇴</Button>
      </Container>
      <CautionBox state={caution}>
        <Text>정말로 회원 탈퇴를 하시겠습니까?</Text>
        <CautionBoxContainer>
        <CautionButton>확인</CautionButton>
        <CautionButton onClick={()=>setCaution(false)}>취소</CautionButton>
        </CautionBoxContainer>
      </CautionBox>
    </>
  );
};
const Title = styled.div`
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 50px;
  width: 100px;
  text-align: center;
  font-size: 32px;
  font-weight: 700;
`;
const Container = styled.div`
  margin: 0 auto;
  margin-bottom: 50px;
  max-width: 610px;
  padding-top: 20px;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 20px;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%), 0 1px 3px 0 rgb(0 0 0 / 12%);
  };
`;
const SemiTitle = styled.div`
  margin-left: 20px;
  font-size: 18px;
  font-weight: 600;
`;
const Text = styled.div`
  margin-top: 30px;
  margin-bottom: 5px;
  font-weight: 600;
  line-height: 20px;
`;

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
  padding-top: 5px;
`;
const InputText = styled.div`
  position: absolute;
  top: ${(props) => {
    return props.state == true ? "0px" : "17.5px";
  }};
  transition: 0.3s;
  font-size: ${(props) => {
    return props.state == true ? "12px" : "16px";
  }};
  font-weight: 600;
  pointer-events: none;
  color: #aaaaaa;
  color: ${(props) => {
    return props.available == 0 ? "red" : "";
  }};
  color: ${(props) => {
    return props.available == 1 ? "#3f51b5" : "";
  }};
`;
const EmailInput = styled.input`
  padding: 0;
  display: block;
  margin-bottom: 10px;
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  outline: none;
  border: none;
  border-bottom: 1px solid #bbbbbb;
  font-size: 16px;
  border-bottom: ${(props) => {
    return props.available == 0 ? "2px solid red" : "";
  }};
  border-bottom: ${(props) => {
    return props.available == 1 ? "2px solid #3f51b5" : "";
  }};
  transition: 0.3s;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 190px;
  height: 38px;
  border-radius: 5px;
  text-align: center;
  font-weight: 500;
  color: ${(props) => {
    return props.answer > 0 && props.pw == 1 && props.pwCheck == 1 ? "#FFFFFF" : "#AAAAAA";
  }};
  background-color: ${(props) => {
    return props.answer > 0 && props.pw == 1 && props.pwCheck == 1? "#3f51b5" : "#DDDDDD";
  }};
  transition: 0.3s;
  &:nth-of-type(3) {
    margin-top: 20px;
    width: 80px;
    color: #FFFFFF;
    background-color: #ff4081;
  };
`;

const CautionBox = styled.div`
background-color: ${(props) => {
  return caution == true ? "#3f51b5" : "#DDDDDD";
}};
  z-index: 1; 
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding-left: 25px;
  padding-right: 25px;
  padding-bottom: 25px;
  width: 320px;
  background-color: #FFFFFF;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 11px 15px -7px rgb(0 0 0 / 20%), 0 24px 38px 3px rgb(0 0 0 / 14%), 0 9px 46px 8px rgb(0 0 0 / 12%);
`

const CautionBoxContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const CautionButton = styled.div`
  margin-top: 15px;
  width: 40%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 38px;
  border-radius: 5px;
  font-weight: 500;
  color: #FFFFFF;
  background-color:  #ff4081;
  cursor: pointer;
  &:nth-of-type(2) {
    background-color: #3f51b5
  };



`


export default AccountPage;
