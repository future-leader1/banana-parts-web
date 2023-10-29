import { yupResolver } from '@hookform/resolvers/yup';
import { ApprovalType } from 'generated/api/admin';
import { AdminUserSearchType } from 'generated/api/admin/models/AdminUserSearchType';
import AdminLayout from 'layouts/AdminLayout';
import { filter, includes } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AdminUserList } from 'src/components/AdminUserList';
import { Button } from 'src/components/Button';
import { Checkbox } from 'src/components/Checkbox';
import { Icon } from 'src/components/Icon';
import { Label } from 'src/components/Label';
import { OptionCheckbox } from 'src/components/OpionCheckbox';
import { Select } from 'src/components/Select';
import { UserDataBar } from 'src/components/UserDataBar';
import {
  ADMIN_DEFAULT_ITEMS_PER_PAGE,
  APPROVAL_TYPE_VALUE,
  USER_SERACH_TYPE_VALUE,
} from 'src/constants/constants';
import {
  useGetAllUsersByAdmin,
  useGetUserStaticsAdmin,
} from 'src/hooks/AdminUserHook';
import { LanguageType } from 'src/locale/constant';
import { SearchUserSchema } from 'src/schema/admin';

const ApprovalTypeCount = Object.keys(APPROVAL_TYPE_VALUE).length;
const ApprovalTypesArr = [...Object.keys(ApprovalType)] as ApprovalType[];
interface AdminUsersFormValue {
  searchType?: AdminUserSearchType;
  approvalTypes?: ApprovalType[];
  searchKeyword?: string;
  isApproved?: boolean;
}
export default function UserList() {
  const [checkedBusiness, setCheckedBusiness] = useState<boolean[]>([]);
  const [page, setPage] = useState(1);
  const [searchDto, setSearchDto] = useState<AdminUsersFormValue>({});
  const { data: allUsers } = useGetAllUsersByAdmin({
    ...searchDto,
    page,
    itemsPerPage: ADMIN_DEFAULT_ITEMS_PER_PAGE,
  });
  const { data: userStatics } = useGetUserStaticsAdmin();

  const methods = useForm<AdminUsersFormValue>({
    mode: 'onSubmit',
    resolver: yupResolver(SearchUserSchema),
    defaultValues: {
      approvalTypes: [],
    },
  });

  const { register, handleSubmit, reset, setValue, watch } = methods;

  const isAllCheckedApprovalType =
    watch('approvalTypes')?.length === ApprovalTypeCount;

  const isAllCheckedBusiness = checkedBusiness.length === 2;

  const handleCheckAllApprovalType = () => {
    if (isAllCheckedApprovalType) {
      setValue('approvalTypes', []);
    } else {
      setValue('approvalTypes', ApprovalTypesArr);
    }
  };
  const handleCheckAllBusiness = () => {
    if (isAllCheckedBusiness) {
      setCheckedBusiness([]);
    } else {
      setCheckedBusiness([true, false]);
    }
  };

  useEffect(() => {
    if (checkedBusiness.length === 0 || checkedBusiness.length === 2) {
      return;
    }
    setValue('isApproved', checkedBusiness[0]);
  }, [checkedBusiness, setValue]);

  return (
    <div className="mx-auto my-5 flex w-full max-w-screen-lg flex-col space-y-5 px-4">
      <UserDataBar
        firstTitle="전체"
        firstDesc={userStatics?.totalCount}
        secondTitle="승인"
        secendDesc={userStatics?.approvedCount}
        thirdTitle="거절"
        thirdDesc={userStatics?.rejectedCount}
        fourthTitle="대기"
        fourthDesc={userStatics?.pendingCount}
      />
      <div className="w-full rounded-md border bg-white px-4 py-5">
        <div className="flex items-center justify-between space-x-3">
          <div className="flex flex-1 items-end space-x-3">
            <Select label="검색어" className="w-36" {...register('searchType')}>
              <option selected value={AdminUserSearchType.NAME}>
                {
                  USER_SERACH_TYPE_VALUE[LanguageType.ko][
                    AdminUserSearchType.NAME
                  ]
                }
              </option>
              <option value={AdminUserSearchType.SELLER}>
                {
                  USER_SERACH_TYPE_VALUE[LanguageType.ko][
                    AdminUserSearchType.SELLER
                  ]
                }
              </option>
              <option value={AdminUserSearchType.PHONE_NUMBER}>
                {
                  USER_SERACH_TYPE_VALUE[LanguageType.ko][
                    AdminUserSearchType.PHONE_NUMBER
                  ]
                }
              </option>
              <option value={AdminUserSearchType.USER_ID}>
                {
                  USER_SERACH_TYPE_VALUE[LanguageType.ko][
                    AdminUserSearchType.USER_ID
                  ]
                }
              </option>
            </Select>

            <div className="relative h-12 flex-1 rounded-md border bg-white">
              <input
                className="ml-2 mt-2 h-8 text-sm placeholder-gray-400"
                {...register('searchKeyword')}
              />
              <Icon.Search className="absolute right-3 top-3" />
            </div>
          </div>
          <div>
            <Label text="승인 상태" />
            <div className="flex space-x-2">
              <Checkbox
                label="전체"
                checked={isAllCheckedApprovalType}
                onChange={handleCheckAllApprovalType}
              />
              <OptionCheckbox
                datas={Object.keys(APPROVAL_TYPE_VALUE[LanguageType.ko])}
                mappingEnum={APPROVAL_TYPE_VALUE[LanguageType.ko]}
                {...register('approvalTypes')}
              />
            </div>
          </div>
          <div>
            <Label text="사업자 등록" />
            <div className="flex space-x-3">
              <Checkbox
                label="전체"
                checked={isAllCheckedBusiness}
                onChange={handleCheckAllBusiness}
              />
              <Checkbox
                label="Y"
                checked={includes(checkedBusiness, true)}
                onChange={() => {
                  if (includes(checkedBusiness, true)) {
                    setCheckedBusiness(
                      filter(checkedBusiness, (boolean) => boolean !== true)
                    );
                  } else {
                    setCheckedBusiness([...checkedBusiness, true]);
                  }
                }}
              />
              <Checkbox
                label="N"
                checked={includes(checkedBusiness, false)}
                onChange={() => {
                  if (includes(checkedBusiness, false)) {
                    setCheckedBusiness(
                      filter(checkedBusiness, (boolean) => boolean !== false)
                    );
                  } else {
                    setCheckedBusiness([...checkedBusiness, false]);
                  }
                }}
              />
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit((data) => {
            setSearchDto({
              ...(data.searchType && { searchType: data.searchType }),
              ...(watch('approvalTypes')?.length !== ApprovalTypeCount &&
                watch('approvalTypes')?.length !== 0 && {
                  approvalTypes: data.approvalTypes,
                }),
              ...(data.searchKeyword && { searchKeyword: data.searchKeyword }),
              ...(checkedBusiness.length === 1 && {
                isApproved: data.isApproved,
              }),
            });
          })}
          className="mt-4 space-x-3 text-right"
        >
          <Button
            text="초기화"
            type="button"
            className="outlined-brand-black w-40"
            onClick={() => {
              reset({ searchKeyword: '' });
              setSearchDto({});
              setValue('approvalTypes', []);
              setCheckedBusiness([]);
            }}
          />
          <Button
            text="검색"
            type="submit"
            className="filled-brand-black w-40"
          />
        </form>
        {allUsers && (
          <AdminUserList allUsers={allUsers} page={page} setPage={setPage} />
        )}
      </div>
    </div>
  );
}

UserList.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
