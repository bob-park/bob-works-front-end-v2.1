'use client';

import { ReactNode } from 'react';
import { useEffect, useState } from 'react';

// next
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

// hooks
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';

// store
import { commonActions } from '@/store/common';
import { userActions } from '@/store/user';
import { noticeActions } from '@/store/notice';

// react-icon
import { LuLayoutDashboard, LuLogOut } from 'react-icons/lu';
import {
  GrDocumentTime,
  GrDocumentUpdate,
  GrNotification,
} from 'react-icons/gr';
import { MdOutlineHolidayVillage } from 'react-icons/md';
import { AiOutlineUnorderedList, AiOutlineSetting } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { BsInfoCircle } from 'react-icons/bs';
import { VscError } from 'react-icons/vsc';

// daisyui
import {
  Navbar,
  Dropdown,
  Button,
  Badge,
  Menu,
  Avatar,
  Drawer,
  Tooltip,
  Toast,
} from 'react-daisyui';

// user actions
const { readAlert } = commonActions;
const { requestGetUser } = userActions;
const { requestCountOfUnread } = noticeActions;

function getSystemAlertIcon(level: SystemAlertLevel) {
  switch (level) {
    case 'error':
      return <VscError className="text-red-600 stroke-info shrink-0 w-6 h-6" />;

    default:
      return (
        <BsInfoCircle className="text-sky-600 stroke-info shrink-0 w-6 h-6" />
      );
  }
}

export default function DefaultNavBar({
  user,
  children,
}: {
  user: User;
  children: ReactNode;
}) {
  // state
  const [visible, setVisible] = useState<boolean>(false);

  // router
  const router = useRouter();
  const pathname = usePathname();

  // store
  const dispatch = useAppDispatch();
  const { alerts } = useAppSelector((state) => state.common);
  const { countOfUnread } = useAppSelector((state) => state.notice);

  // useeffect
  useEffect(() => {
    if (!user) {
      return;
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      alerts.length && handleReadAlert(0);
    }, 5_000);

    return () => {
      clearInterval(intervalId);
    };
  }, [alerts]);

  // handle
  const toggleVisible = () => {
    setVisible(!visible);
  };

  const activeMenuItem = (menuPath: string): string => {
    if (menuPath === '/') {
      return pathname.length === 1 ? 'active' : '';
    }

    if (pathname.startsWith(menuPath)) {
      return 'active';
    }

    return '';
  };

  const handleLogout = () => {
    router.push('/api/logout');
  };

  const handleReadAlert = (id: number) => {
    dispatch(readAlert(id));
  };

  return (
    <>
      <Drawer
        className="lg:drawer-open h-screen"
        sideClassName="drawer-side z-40"
        side={
          <aside className="w-80 h-full bg-base-100 lg:fixed">
            <div className="bg-base-100 sticky top-0  items-center gap-2 bg-opacity-90 px-4 py-2 backdrop-blur lg:flex ">
              <a className="btn btn-ghost normal-case px-2 mx-2 text-2xl font-bold">
                Bob Works
              </a>
            </div>

            <Menu className="w-80 p-2" size="md">
              <Menu.Item>
                <Link className={activeMenuItem('/')} href="/">
                  <LuLayoutDashboard />
                  대시보드
                </Link>
              </Menu.Item>
              <Menu.Item></Menu.Item>
              <Menu.Title>
                <h2>문서 결재</h2>
              </Menu.Title>
              <Menu.Item>
                <Link
                  className={activeMenuItem('/document/search')}
                  href="/document/search"
                >
                  <AiOutlineUnorderedList />
                  결재 신청 목록
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link
                  className={activeMenuItem('/document/approve')}
                  href="/document/approve/search"
                >
                  <GrDocumentTime />
                  결재 대기 목록
                </Link>
              </Menu.Item>
              <Menu.Item></Menu.Item>
              <Menu.Title>
                <h2>문서 신청</h2>
              </Menu.Title>
              <Menu.Item>
                <Link
                  className={activeMenuItem('/request/vacation')}
                  href="/request/vacation"
                >
                  <GrDocumentUpdate />
                  휴가계 신청
                </Link>
              </Menu.Item>
              <Menu.Item>
                <a>
                  <MdOutlineHolidayVillage />
                  휴일 근무 보고서 신청
                  <Badge size="sm" color="secondary">
                    준비중
                  </Badge>
                </a>
              </Menu.Item>
            </Menu>
          </aside>
        }
        open={visible}
        onClickOverlay={toggleVisible}
      >
        <div className="sticky top-0 z-30 flex h-20 w-full justify-center bg-opacity-90 backdrop-blur transition-all duration-100 bg-base-100 text-base-content shadow-sm">
          <Navbar className="">
            <Navbar.Start className="flex-none lg:hidden">
              <div className="flex-none lg:hidden">
                <Button shape="square" color="ghost" onClick={toggleVisible}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-6 h-6 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </Button>
              </div>
              <div className="flex-1 px-2 mx-2 lg:hidden text-2xl font-bold">
                Bob Works
              </div>
            </Navbar.Start>
            <Navbar.End className="lg:w-full">
              <div className="mr-10">
                <b>{user?.team?.name}</b> - <span>{user?.position?.name}</span>
                <b className="ml-4">{user?.name}</b>
              </div>
              <Dropdown className="mr-10" hover end>
                <Avatar
                  src={user?.avatar || '/default_avatar.jpg'}
                  size="sm"
                  shape="circle"
                  border
                  online
                />
                <Dropdown.Menu className="w-48 bg-base-100 shadow-xl ">
                  <li>
                    <Link href="/notice">
                      <GrNotification />
                      공지{' '}
                      {!!countOfUnread && (
                        <Badge color="secondary">+{countOfUnread}</Badge>
                      )}
                    </Link>
                  </li>

                  <hr />

                  <li>
                    <Link href="/settings/profile">
                      <CgProfile />
                      프로필
                    </Link>
                  </li>

                  <li>
                    <Link href="/settings/users">
                      <AiOutlineSetting />
                      설정
                    </Link>
                  </li>

                  <hr />
                  <Dropdown.Item onClick={handleLogout}>
                    <LuLogOut />
                    로그아웃
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Navbar.End>
          </Navbar>
        </div>

        <div className="flex items-center justify-center m-10 min-w-[746px] max-w-[1036px] lg:ml-[350px]">
          {children}
        </div>

        <div className="fixed bottom-10 right-10">
          <Tooltip message="무엇을 도와드릴까요?">
            <Avatar
              className=""
              size="sm"
              shape="circle"
              src="/customer_service_center.png"
              border
              color="accent"
            />
          </Tooltip>
        </div>
      </Drawer>
      <Toast className="mt-20 mr-5" horizontal="end" vertical="top">
        {alerts.map((item, index) => (
          <div
            key={`system_alert_id_${index}`}
            className="alert shadow-2xl bg-base-200"
          >
            {getSystemAlertIcon(item.level)}
            <div>
              <h3>{item.message}</h3>
            </div>

            <Button
              color="ghost"
              size="sm"
              onClick={() => handleReadAlert(index)}
            >
              See
            </Button>
          </div>
        ))}
      </Toast>
    </>
  );
}
