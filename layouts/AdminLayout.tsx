import AdminMain from 'src/admin/components/AdminMain';
import { useModal } from 'src/components/Modal/Modal';
import { Sidebar } from 'src/components/Sidebar';
import { useAdminAuthCheck } from 'src/hooks/AdminAuthHook';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const { adminLogoutConfirmModal } = useModal();

  const isValidAdmin = useAdminAuthCheck();

  if (!isValidAdmin) return <></>;
  return (
    <div className="flex h-screen">
      <Sidebar>
        <Sidebar.Title>Admin</Sidebar.Title>
        <Sidebar.Menu>
          <Sidebar.Menu.Item text="회원 관리">
            <Sidebar.Menu.Item.Sub text="회원 관리" to="/admin/users" />
            <Sidebar.Menu.Item.Sub
              text="신고 관리"
              to="/admin/user-penalty-history"
            />
            <Sidebar.Menu.Item.Sub text="유저 생성" to="/admin/users/create" />
          </Sidebar.Menu.Item>
          <Sidebar.Menu.Item text="상품 관리">
            <Sidebar.Menu.Item.Sub
              text="대량 판매 등록 관리"
              to="/admin/register-request-history"
            />
            <Sidebar.Menu.Item.Sub
              text="판매 등록 관리"
              to="/admin/merchandise"
            />
            <Sidebar.Menu.Item.Sub text="상품 등록 관리" to="/admin/product" />
            <Sidebar.Menu.Item.Sub
              text="대량 상품 등록"
              to="/admin/multi-product"
            />
            <Sidebar.Menu.Item.Sub text="제조사 관리" to="/admin/manufactor" />
            <Sidebar.Menu.Item.Sub text="대리점 관리" to="/admin/dealer" />
          </Sidebar.Menu.Item>
          <Sidebar.Menu.Item text="견적 관리" to="/admin/product-estimate" />
          <Sidebar.Menu.Item text="게시판 관리">
            <Sidebar.Menu.Item.Sub
              text="찾아주세요 게시글 관리"
              to="/admin/board"
            />
          </Sidebar.Menu.Item>
          <Sidebar.Menu.Item text="뉴스 관리">
            <Sidebar.Menu.Item.Sub text="뉴스 목록 관리" to="/admin/news" />
            <Sidebar.Menu.Item.Sub
              text="뉴스 카테고리 관리"
              to="/admin/news/category"
            />
          </Sidebar.Menu.Item>
          <Sidebar.Menu.Item text="위키 관리">
            <Sidebar.Menu.Item.Sub text="위키 목록 관리" to="/admin/wiki" />
            <Sidebar.Menu.Item.Sub
              text="위키 카테고리 관리"
              to="/admin/wiki/category"
            />
            <Sidebar.Menu.Item.Sub
              text="위키 의견 작성 관리"
              to="/admin/wiki/request-history"
            />
          </Sidebar.Menu.Item>
          <Sidebar.Menu.Item text="카테고리 태그 관리" to="/admin/category" />
          <Sidebar.Menu.Item
            text="로그아웃"
            onClick={() => adminLogoutConfirmModal()}
          />
        </Sidebar.Menu>
      </Sidebar>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden bg-[#F4F4F5]">
        <AdminMain>{children}</AdminMain>
      </div>
    </div>
  );
}
