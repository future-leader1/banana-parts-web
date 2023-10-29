import { Button } from './Button';

const BlurredCard = () => {
  return (
    <div className="relative">
      <div className="rounded-md blur-sm ">
        <div className="mt-5 flex items-stretch border-b font-semibold">
          <div className="flex w-16 flex-none items-center justify-center rounded-l-md bg-brand-1 text-3xl text-white">
            {2}
          </div>
          <div className="flex-grow bg-white px-4 py-2 text-2xl">
            STEP2. 전극 공정 – 배터리의 양극과 음극 만들기
          </div>
        </div>
        <div className="rounded-b-md bg-white p-4">
          {' '}
          ① 믹싱 공정 : 배터리 소재의 기초가 되는 양극, 음극 활물질과 용매 등을
          섞어 중간재인 슬러리를 만듭니다. 이때 활물질 입자 간 접착력을 높이기
          위해 ‘바인더’를 첨가하고, 사이의 빈틈들로 인해 용량이 줄어들 수 있어
          이를 메꿔주는 ‘도전재’를 함께 넣습니다. <br /> ② 코팅 공정 : 완성된
          양극 슬러리를 알루미늄 포일에, 음극 슬러리를 구리 포일에 얇게
          코팅합니다. 바인더를 전극에 골고루 배치해 성능과 수명을 향상시킬 수
          있습니다. <br /> ③ 롤 프레싱 공정 : 코팅이 완료되면, 두 개의 커다란
          압연 사이로 전극을 통과시켜 일정하고 편평하게 펴줍니다. 이때, 전극
          표면은 활물질과의 결합력이 좋아지고 리튬 이온이 원활히 이동할 수 있어
          전지의 출력과 성능을 향상시킵니다. <br /> ④ 슬리팅과 노칭 공정 :
          납작해진 전극들을 설계된 배터리 규격에 맞춰 절단합니다. 슬리팅 공정을
          통해 전극 폭을 세로 방향으로 잘라내고, 노칭 공정에서 전극을 가로로
          재단하여 V자 홈과 양극·음극 탭(Tab)을 만들어주면 전극 공정이
          완료됩니다.
        </div>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 rounded-md bg-black bg-opacity-30">
        <h3 className="text-2xl font-semibold text-white drop-shadow-xl">
          바나나파츠 회원 서비스 입니다
        </h3>
        <p className="text-center text-white  drop-shadow-xl">
          더 많은 정보를 확인하고 싶으시다면, <br />
          지금 가입하고 위키제목 의 모든 내용을 확인해보세요.
        </p>

        <div className="flex gap-5">
          <Button
            text="회원가입"
            className=" w-24 rounded-md bg-white md:w-48 drop-shadow-xl"
            to="/signup"
          />
          <Button
            text="로그인"
            className="w-24 border-2 text-white hover:bg-white hover:text-brand-black transition-colors duration-200 ease-in-out md:w-48 drop-shadow-xl"
            to="/login"
          />
        </div>
      </div>
    </div>
  );
};

export default BlurredCard;
