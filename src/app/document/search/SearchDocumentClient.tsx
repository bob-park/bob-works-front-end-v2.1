'use client';

// react
import { FormEvent, useEffect, useState } from 'react';

// react-icons
import { BiSearch } from 'react-icons/bi';
import { GrPowerCycle } from 'react-icons/gr';

// daisyui
import { Form, Select, Button } from 'react-daisyui';

import { format } from 'date-fns';

// hooks
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';

// store
import { documentActions } from '@/store/document';
import { PaginationParams } from '@/store/types';

// component
import DocumentTable from '@/components/DocumentTable';

// utils
import { parseDocumentType, parseDocumentStatus } from '@/utils/ParseUtils';
import {
  DocumentType,
  DocumentsStatus,
  DocumentsType,
} from '@/store/document/types';
import DocumentPagination from '@/components/DocumentPagination';
import { getTotalPageCount } from '@/utils/paginationUtils';
import { useRouter } from 'next/navigation';

type SelectValue = {
  id: string;
  name: string;
};

// actions
const { requestGetDocumentType, requestSearchDocument } = documentActions;

const documentStatus: SelectValue[] = [
  {
    id: 'ALL',
    name: '전체',
  },
  {
    id: 'WAITING',
    name: '대기',
  },
  {
    id: 'PROCEEDING',
    name: '진행',
  },
  {
    id: 'APPROVE',
    name: '승인',
  },
  {
    id: 'REJECT',
    name: '반려',
  },
  {
    id: 'CANCEL',
    name: '취소',
  },
];

const headers = [
  {
    id: 'id',
    value: '문서 번호',
  },
  {
    id: 'type',
    value: '문서 종류',
    parse: (input: any) => parseDocumentType(input as string),
  },
  {
    id: 'status',
    value: '결재 상태',
    parse: (input: any) => parseDocumentStatus(input as DocumentsStatus),
  },
  {
    id: 'writer',
    value: '작성자',
  },
  {
    id: 'createdDate',
    value: '신청일',
    parse: (input: Date) => format(new Date(input), 'yyyy-MM-dd hh:mm:ss'),
  },
];

export default function SearchDocumentClient() {
  // router
  const router = useRouter();

  // store
  const dispatch = useAppDispatch();
  const { types, isLoading, searchParams, pageable } = useAppSelector(
    (state) => state.document,
  );

  // state
  const [page, setPage] = useState<PaginationParams>(searchParams);

  const dataList = pageable.content.map((item) => {
    return {
      id: item.id,
      type: item.documentType.type,
      status: item.status,
      writer: item.writer.name,
      createdDate: item.createdDate,
    };
  });

  // useEffect
  useEffect(() => {
    dispatch(requestGetDocumentType({}));
  }, []);

  useEffect(() => {}, []);

  useEffect(() => {
    handleSearch(page);
  }, [page]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleSearch = (params: PaginationParams) => {
    dispatch(
      requestSearchDocument({
        params,
        exceptionHandle: {},
      }),
    );
  };

  const handleMoveDetail = (id: number, type: DocumentType) => {
    const moveUri = `/document/search/${type.toLowerCase()}/${id}`;

    router.push(moveUri);
  };

  return (
    <div className="grid grid-cols-1 gap-8">
      <div className="bg-base-100 shadow-xl m-2 border p-10 rounded-lg">
        <div>
          <Form onSubmit={handleSubmit}>
            <div className="grid grid-cols-5 gap-10">
              <div className="col-span-1 text-center pt-2">
                <span className="">문서 종류</span>
              </div>
              <div className="col-span-1">
                <Select color="primary">
                  {new Array({ id: -1, name: '전체' })
                    .concat(types)
                    .map((type) => (
                      <Select.Option
                        key={`documentType_${type.id}`}
                        value={type.id}
                      >
                        {type.name}
                      </Select.Option>
                    ))}
                </Select>
              </div>
              <div className="col-span-1 text-center pt-2">
                <span className="">결재 상태</span>
              </div>
              <div className="col-span-1">
                <Select color="primary">
                  {documentStatus.map((type) => (
                    <Select.Option
                      key={`documentStatus_${type.id}`}
                      value={type.id}
                    >
                      {type.name}
                    </Select.Option>
                  ))}
                </Select>
              </div>
              <div className="col-span-1"></div>

              <div className="col-span-5">
                <div className="flex justify-end gap-5">
                  <Button className="w-52" type="button">
                    <GrPowerCycle className="w-5 h-5" />
                    초기화
                  </Button>
                  <Button className="w-52" type="submit" color="primary">
                    <BiSearch className="w-5 h-5" />
                    조회
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>

      <div>
        <div>
          총 <span className="font-bold">{pageable.total}</span> 개
        </div>
      </div>

      <div className="bg-base-100 shadow-xl overflow-auto border rounded-xl">
        <DocumentTable
          firstCheckbox
          headers={headers}
          dataList={dataList}
          onRowClick={handleMoveDetail}
        />
      </div>

      <div className="flex justify-center">
        <DocumentPagination
          total={getTotalPageCount(pageable.total, pageable.pageable.size)}
          current={pageable.pageable.page + 1}
          onPrev={() => setPage({ ...page, page: page.page - 1 })}
          onNext={() => setPage({ ...page, page: page.page + 1 })}
        />
      </div>
    </div>
  );
}
