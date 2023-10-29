import { ApprovalType } from 'generated/api/admin';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { APPROVAL_TYPE_VALUE } from 'src/constants/constants';
import { PATH_DEATIL_TYPE, PATH_TYPE } from 'src/constants/path/constants';
import { useAdminLogout } from 'src/hooks/AdminAuthHook';
import { useUserLogout } from 'src/hooks/AuthHook';
import { LanguageType } from 'src/locale/constant';
import { modalState } from 'src/plugins/ridge';

import { Button } from '../Button';
import NewLineText from '../common/NewLineText';
import { Icon } from '../Icon';
import { AnimationLayout } from './AnimationLayout';

export interface ModalInfoProps {
  title?: string;
  bodyText?: string;
  primaryButtonText?: string;
  primaryButtonClassName?: string;
  primaryClick?: () => void;
  secondaryButtonText?: string;
  secondaryClick?: () => void;
  secondaryButtonClassName?: string;
  isRequiredBack?: boolean;
}

interface ModalProps {}

export const Modal: FC<ModalProps> = () => {
  const modal = modalState.useValue();
  const router = useRouter();
  const {
    title,
    bodyText,
    primaryClick,
    primaryButtonText,
    primaryButtonClassName,
    secondaryClick,
    secondaryButtonText,
    secondaryButtonClassName,
    isRequiredBack,
  } = modal;

  if (!modal.title) return <></>;
  return (
    <AnimationLayout
      open={!!title}
      onClose={() => {
        modalState.reset();
        if (isRequiredBack) {
          router.back();
        }
      }}
    >
      <div className="my-8 w-full max-w-[382px] transform space-y-3 overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">{title}</h4>
          <Icon.X
            onClick={() => {
              modalState.reset();
              if (isRequiredBack) {
                router.back();
              }
            }}
            className="cursor-pointer"
          />
        </div>
        <NewLineText
          className="mt-3 whitespace-pre-wrap text-15 text-gray-600"
          text={bodyText || ''}
        />

        <div className="space-y-3 pt-4">
          {primaryButtonText && (
            <Button
              onClick={() => {
                primaryClick && primaryClick();
                modalState.reset();
              }}
              text={primaryButtonText}
              className={`${
                primaryButtonClassName
                  ? primaryButtonClassName
                  : 'filled-gray-800'
              } w-full`}
            />
          )}

          {secondaryButtonText && (
            <Button
              onClick={() => {
                modalState.reset();
                secondaryClick && secondaryClick();
              }}
              text={secondaryButtonText}
              className={`${
                secondaryButtonClassName
                  ? secondaryButtonClassName
                  : 'outlined-gray-900 border-gray-900'
              } w-full`}
            />
          )}
        </div>
      </div>
    </AnimationLayout>
  );
};

export function useModal() {
  const router = useRouter();
  const logout = useUserLogout();
  const adminLogout = useAdminLogout();
  const { t } = useTranslation('translation', {
    keyPrefix: 'component_Modal',
  });

  const findUserId = (userId: string) =>
    modalState.set({
      title: `${t('아이디 찾기')}`,
      bodyText: `${t(`회원님의 아이디는`)}\n ${userId} ${t(`입니다.`)}`,
      primaryButtonText: `${t('로그인하기')}`,
      primaryClick: () => router.push('/login'),
    });

  const successCreateSellerInfo = () => {
    modalState.set({
      title: `${t('정보 제출 완료')}`,
      bodyText: `${t(
        `담당자 및 사업자 정보가 제출되었습니다. \n제출 시점으로부터 평일 기준 12시간 이내 검토 후\n계정 승인이 완료될 예정입니다.`
      )}`,
      primaryButtonText: `${t('확인')}`,
    });
  };

  const successUpdatePassword = () => {
    modalState.set({
      title: `${t('비밀번호 변경 완료')}`,
      bodyText: `${t(
        `회원님의 비밀번호가 수정되었습니다 \n변경된 비밀번호로 재로그인해주세요.`
      )}`,
      primaryButtonText: `${t('로그인하기')}`,
      primaryClick: () => router.push('/login'),
    });
  };

  const showMerchandiseDeleteModal = (onDelete: () => void) => {
    modalState.set({
      title: `${t('삭제하기')}`,
      bodyText: `${t(`해당 상품을 판매삭제 하시겠습니까?`)}`,
      primaryButtonText: `${t('삭제하기')}`,
      primaryClick: () => {
        onDelete();
      },
    });
  };

  const reapply = (onClick: () => void) =>
    modalState.set({
      title: `${t('재신청 필요')}`,
      bodyText: `${t(
        `선택하신 정보 수정을 원할경우, 관리자 재인증\n절차가 필요합니다. 정보 수정 후,\n재인증을 요청하시겠습니까?`
      )}`,
      primaryButtonText: `${t('정보 수정하기')}`,
      primaryClick: () => {
        onClick();
      },
    });

  const estimateLogin = () => {
    modalState.set({
      title: `${t('로그인')}`,
      bodyText: `${t(`견적요청은 로그인 후 이용가능합니다.`)}`,
      primaryButtonText: `${t('로그인하기')}`,
      primaryClick: () => router.push('/login'),
    });
  };

  const sellerInfoLogin = () => {
    modalState.set({
      title: `${t('로그인')}`,
      bodyText: `${t(`판매자 상세보기는 로그인 후 이용가능합니다.`)}`,
      primaryButtonText: `${t('로그인하기')}`,
      primaryClick: () => router.push('/login'),
    });
  };

  const bookmarkLogin = () => {
    modalState.set({
      title: `${t('로그인')}`,
      bodyText: `${t(`즐겨찾기 추가는 로그인 후 이용가능합니다.`)}`,
      primaryButtonText: `${t('로그인하기')}`,
      primaryClick: () => router.push('/login'),
    });
  };

  const createWikiLogin = () => {
    modalState.set({
      title: `${t('로그인')}`,
      bodyText: `${t(`새 글 작성은 로그인 후 이용 가능합니다.`)}`,
      primaryButtonText: `${t('로그인하기')}`,
      primaryClick: () => router.push('/login'),
    });
  };

  const requestOpinionLogin = () => {
    modalState.set({
      title: `${t('로그인')}`,
      bodyText: `${t(`위키 의견 작성은 로그인 후 이용가능합니다.`)}`,
      primaryButtonText: `${t('로그인하기')}`,
      primaryClick: () => router.push('/login'),
    });
  };

  const adminDeleteModal = (onDelete: () => void) =>
    modalState.set({
      title: '삭제하기',
      bodyText: '삭제시 복원이 불가합니다. 정말 삭제하시겠습니까?',
      primaryButtonText: '삭제하기',
      primaryClick: () => {
        onDelete();
      },
    });

  const boardDeleteModal = (onDelete: () => void) =>
    modalState.set({
      title: '게시글 삭제',
      bodyText:
        '삭제하신 게시물은 다시 복구할 수 없습니다.\n정말 삭제하시겠습니까?',
      primaryButtonText: '삭제하기',
      primaryClick: () => {
        onDelete();
      },
    });

  const loginModal = (onSuccess?: () => void) => {
    modalState.set({
      title: `${t('로그인')}`,
      bodyText: `${t('로그인이 필요한 서비스입니다.')}`,
      primaryButtonText: `${t('로그인하기')}`,
      primaryClick: () => {
        router.push('/login');
        onSuccess && onSuccess();
      },
    });
  };

  const emailRegisterModal = () => {
    modalState.set({
      title: `${'이메일 등록'}`,
      bodyText: `${'게시글에 답변이 달렸을 때 알림을 보내드릴 이메일이 필요합니다.'}`,
      primaryButtonText: `${'등록하기'}`,
      primaryClick: () => {
        router.push('mypage/profile');
      },
    });
  };

  const wikiEmailRegisterModal = () => {
    modalState.set({
      title: `${'이메일 등록'}`,
      bodyText: `${'위키 댓글과 의견작성 알림을 보내드릴 이메일이 필요합니다.'}`,
      primaryButtonText: `${'등록하기'}`,
      primaryClick: () => {
        router.replace('/mypage/profile');
      },
    });
  };

  const wikiPhoneEmailMOdal = () => {
    modalState.set({
      title: `${'휴대전화 인증'}`,
      bodyText: `${'위키 댓글과 의견작성 알림을 보내드릴 휴대전화번호 인증 필요합니다.'}`,
      primaryButtonText: `${'인증하기'}`,
      primaryClick: () => {
        router.replace('/mypage/profile');
      },
    });
  };

  const writerVerifyModal = () => {
    modalState.set({
      title: `${'작성 권한 인증 필요'}`,
      bodyText: `${'해당 기능은 작성 권한 인증이 필요하니 나의활동 > 작성 권한 인증에서 작성 권한 인증을 진행해주시길 바랍니다.'}`,
      primaryButtonText: `${'인증하기'}`,
      primaryClick: () => {
        router.replace('/writer/wiki-info/');
      },
    });
  };

  const changeApprovalTypeModal = (
    status: ApprovalType,
    onSuccess: () => void
  ) => {
    modalState.set({
      title: '승인 상태 변경',
      bodyText: `승인 상태를 ${
        APPROVAL_TYPE_VALUE[LanguageType.ko][status]
      } 로 변경하시겠습니까? `,
      primaryButtonText: '확인',
      primaryClick: () => {
        onSuccess();
      },
    });
  };

  const logoutConfirmModal = (onSuccess?: () => void) => {
    modalState.set({
      title: `${t('로그아웃')}`,
      bodyText: `${t('로그아웃 하시겠습니까?')}`,
      primaryButtonText: `${t('확인')}`,
      primaryClick: () => {
        logout();
        onSuccess && onSuccess();
      },
    });
  };

  const adminLogoutConfirmModal = () => {
    modalState.set({
      title: '로그아웃',
      bodyText: '로그아웃 하시겠습니까?',
      primaryButtonText: '확인',
      primaryClick: () => {
        adminLogout();
      },
    });
  };

  const wikiWriterInfoSubmitModal = () => {
    modalState.set({
      title: '정보 제출 완료',
      bodyText:
        '작성자 정보가 제출되었습니다.\n제출 시점으로부터 1~2영업일 이내 검토 후 계정 승인이 완료될 예정입니다.',
      primaryButtonText: '확인',
    });
  };

  const boardStatusUpdate = (onStatusChange: () => void) => {
    modalState.set({
      title: ' 답변 완료로 변경하기',
      bodyText:
        '답변 상태를 완료로 변경 하시겠습니까?\n* 변경하면 더이상 답변을 받지 않습니다.',
      primaryButtonText: '확인',
      primaryClick: () => {
        onStatusChange();
      },
    });
  };
  const requireSellerInfoModal = () => {
    modalState.set({
      title: `${t('판매자 등록 신청')}`,
      bodyText: `${t('판매자 등록이 필요한 페이지입니다.')}`,
      primaryButtonText: `${t('등록하러 가기')}`,
      primaryClick: () => {
        router.replace({
          pathname: '/seller/sellerInfo/add',
          query: {
            type: PATH_TYPE.SELLER,
            detailType: PATH_DEATIL_TYPE.SELLER_INFO,
          },
        });
      },
      isRequiredBack: true,
    });
  };
  const deleteAccountModal = (onSuccess: () => void) => {
    modalState.set({
      title: `${t('탈퇴하기')}`,
      bodyText: `${t(
        '탈퇴시 정보 복원이 불가능합니다. \n정말 탈퇴하시겠습니까?'
      )}`,
      primaryButtonText: `${t('탈퇴하기')}`,
      primaryClick: () => onSuccess(),
    });
  };

  const deleteCategorytModal = (onSuccess: () => void) => {
    modalState.set({
      title: '카테고리 삭제',
      bodyText:
        '카테고리에 속한 글이 있다면 삭제 불가합니다.\n정말 카테고리를 삭제하시겠습니까?',
      primaryButtonText: '삭제',
      primaryClick: () => onSuccess(),
    });
  };
  const deleteWikiModal = (onSuccess: () => void) => {
    modalState.set({
      title: '위키 글 삭제',
      bodyText: '정말 작성하신 글을 삭제하시겠습니까?',
      primaryButtonText: '삭제',
      primaryClick: () => onSuccess(),
    });
  };

  return {
    findUserId,
    showMerchandiseDeleteModal,
    wikiEmailRegisterModal,
    successUpdatePassword,
    successCreateSellerInfo,
    reapply,
    estimateLogin,
    sellerInfoLogin,
    bookmarkLogin,
    adminDeleteModal,
    loginModal,
    changeApprovalTypeModal,
    logoutConfirmModal,
    adminLogoutConfirmModal,
    requireSellerInfoModal,
    deleteAccountModal,
    boardDeleteModal,
    boardStatusUpdate,
    emailRegisterModal,
    deleteCategorytModal,
    createWikiLogin,
    deleteWikiModal,
    requestOpinionLogin,
    wikiWriterInfoSubmitModal,
    wikiPhoneEmailMOdal,
    writerVerifyModal,
  };
}
