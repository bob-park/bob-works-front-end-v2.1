'use client';

// react
import { FormEvent, useState } from 'react';
// daisyui
import { Button, Form, Select } from 'react-daisyui';
// react-icons
import { BiSearch } from 'react-icons/bi';
import { GrPowerCycle } from 'react-icons/gr';

// next
import { useRouter } from 'next/navigation';

import {
  useGetApprovalDocument,
  useGetDocumentType,
} from '@/hooks/document/document';

// hooks
import {
  parseDocumentStatus,
  parseDocumentType,
  parsePageName,
} from '@/utils/ParseUtils';
import { getTotalPageCount } from '@/utils/paginationUtils';

import DocumentPagination from '@/components/DocumentPagination';
// component
import DocumentTable from '@/components/DocumentTable';
import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';
import ko from 'timeago.js/lib/lang/ko';

timeago.register('ko', ko);

type SelectValue = {
  id: string;
  name: string;
};

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
    value: '결재 번호 ',
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
    id: 'reason',
    value: '반려 사유',
  },
  {
    id: 'createdDate',
    value: '신청일',
    parse: (input: Date) => <TimeAgo datetime={input} locale="ko" />,
  },
  {
    id: 'approvedDateTime',
    value: '결재일',
    parse: (input: Date) => input && <TimeAgo datetime={input} locale="ko" />,
  },
];

export default function SearchDocumentApprovalClient() {
  // next
  const router = useRouter();

  // state
  const [page, setPage] = useState<PageParams>({
    page: 0,
    size: 0,
  });

  // query
  const { approvalDocuments } = useGetApprovalDocument(page);
  const { documentsTypes } = useGetDocumentType();

  const dataList = approvalDocuments.content.map((item) => {
    return {
      id: item.id,
      type: item.document.documentType.type,
      status: item.status,
      writer: item.document.writer.name,
      reason: item.reason,
      createdDate: item.document.createdDate,
      approvedDateTime: item.approvedDateTime,
    };
  });

  // handle
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleMoveDetail = (id: number, type: DocumentsType) => {
    const moveUri = `/document/approve/${parsePageName(type)}/${id}`;

    router.push(moveUri);
  };

  return (
    <div className="grid grid-cols-1 gap-8">
      {/* 검색 조건  */}
      <div className="m-2 rounded-lg border bg-base-100 p-10 shadow-xl">
        <Form onSubmit={handleSubmit}>
          <div className="grid grid-cols-5 gap-10">
            <div className="col-span-1 pt-2 text-center">
              <span className="">문서 종류</span>
            </div>
            <div className="col-span-1">
              <Select color="primary">
                {new Array({ id: -1, name: '전체' })
                  .concat(documentsTypes)
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
            <div className="col-span-1 pt-2 text-center">
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
                  <GrPowerCycle className="h-5 w-5" />
                  초기화
                </Button>
                <Button className="w-52" type="submit" color="primary">
                  <BiSearch className="h-5 w-5" />
                  조회
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </div>

      <div>
        <div>
          총 <span className="font-bold">{approvalDocuments.total}</span> 개
        </div>
      </div>

      <div className="overflow-auto rounded-xl border bg-base-100 shadow-xl">
        <DocumentTable
          firstCheckbox
          headers={headers}
          dataList={dataList}
          onRowClick={handleMoveDetail}
        />
      </div>

      <div className="flex justify-center">
        <DocumentPagination
          total={getTotalPageCount(
            approvalDocuments.total || 0,
            approvalDocuments.pageable?.size || 0,
          )}
          current={(approvalDocuments.pageable?.page || 0) + 1}
          onPrev={() => setPage({ ...page, page: page.page - 1 })}
          onNext={() => setPage({ ...page, page: page.page + 1 })}
        />
      </div>
    </div>
  );
}
