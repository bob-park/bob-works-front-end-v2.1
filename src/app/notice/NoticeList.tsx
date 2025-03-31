'use client';

import { useEffect, useState } from 'react';

import { useRead, useSearchNotice } from '@/hooks/notice';

import DocumentPagination from '@/components/DocumentPagination';
import DocumentTable from '@/components/DocumentTable';

import { getTotalPageCount } from '@/utils/paginationUtils';

// daisyui
import { Badge } from 'react-daisyui';
import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';
import ko from 'timeago.js/lib/lang/ko';

timeago.register('ko', ko);

const headers = [
  {
    id: 'title',
    value: '공지',
    parse: (input: string, row: Notice) => (
      <span>
        <span className="pr-2">{input}</span>
        {!row.isRead && <Badge color="secondary">new</Badge>}
      </span>
    ),
  },
  {
    id: 'createdDate',
    value: '공지 날짜',
    parse: (input: Date) => <TimeAgo datetime={input} locale="ko" />,
  },
];

export default function NoticeList() {
  // state
  const [showNoticeDetail, setShowNoticeDetail] = useState<boolean>(false);
  const [searchNoticeParams, setSearchNoticeParams] = useState<PageParams>({
    page: 0,
    size: 10,
  });

  // query
  const { notices } = useSearchNotice(searchNoticeParams);
  const { onRead } = useRead();

  // useEffect
  useEffect(() => {
    handleSearchRequest();
  }, [searchNoticeParams]);

  // handle
  const handleSearchRequest = () => {};

  const handleReadNotice = (id: string) => {
    onRead(id);
  };

  return (
    <>
      <div className="overflow-auto rounded-xl border bg-base-100 shadow-xl">
        <DocumentTable headers={headers} dataList={notices.content} onRowClick={(id: string) => handleReadNotice(id)} />
      </div>
      <div className="flex justify-center">
        <DocumentPagination
          total={getTotalPageCount(notices.total || 0, notices.pageable?.size || 0)}
          current={(notices.pageable?.page || 0) + 1}
          onPrev={() =>
            setSearchNoticeParams({
              ...searchNoticeParams,
              page: searchNoticeParams.page - 1,
            })
          }
          onNext={() =>
            setSearchNoticeParams({
              ...searchNoticeParams,
              page: searchNoticeParams.page + 1,
            })
          }
        />
      </div>
      {/*<Modal className="w-11/12 max-w-5xl" open={showNoticeDetail}>*/}
      {/*  <Modal.Header>*/}
      {/*    <div className="flex justify-between gap-2">*/}
      {/*      <div className="font-bold">{detail?.title}</div>*/}
      {/*      <div className="text-sm font-thin">*/}
      {/*        {detail &&*/}
      {/*          format(new Date(detail.createdDate), 'yyyy-MM-dd HH:mm:ss')}*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </Modal.Header>*/}
      {/*  <Modal.Body>*/}
      {/*    <pre>{detail?.description}</pre>*/}
      {/*  </Modal.Body>*/}
      {/*  <Modal.Actions>*/}
      {/*    <Button color="primary" onClick={() => setShowNoticeDetail(false)}>*/}
      {/*      확인*/}
      {/*    </Button>*/}
      {/*  </Modal.Actions>*/}
      {/*</Modal>*/}
    </>
  );
}
