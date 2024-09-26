'use client';

import { ReactNode, useEffect, useState } from 'react';
// daisyui
import {
  Avatar,
  Badge,
  Button,
  Drawer,
  Dropdown,
  Menu,
  Navbar,
  Tooltip,
} from 'react-daisyui';
import { AiOutlineSetting, AiOutlineUnorderedList } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { FaListUl } from 'react-icons/fa6';
import { GrDocumentTime, GrDocumentUpdate } from 'react-icons/gr';
import { IoAddCircleOutline, IoNotificationsOutline } from 'react-icons/io5';
// react-icon
import { LuLayoutDashboard, LuLogOut } from 'react-icons/lu';
import { MdOutlineHolidayVillage } from 'react-icons/md';

import Link from 'next/link';
// next
import {
  usePathname,
  useRouter,
  useSelectedLayoutSegments,
} from 'next/navigation';

import { useCountUnread } from '@/hooks/notice';

// hooks
import { useStore } from '@/shared/rootStore';

import CustomerChat from './CustomerChat';

const MANAGER_ROLES = ['ROLE_ADMIN', 'ROLE_MANAGER'];

function activeMenu(segments: string[], menuPaths: string[]) {
  if (
    menuPaths.every((menuPath) =>
      segments.some((segment) => segment === menuPath),
    )
  ) {
    return 'active';
  }

  return '';
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
  const [showChat, setShowChat] = useState<boolean>(false);

  // router
  const router = useRouter();
  const pathname = usePathname();
  const segments = useSelectedLayoutSegments();

  // store
  // const dispatch = useAppDispatch();
  // const { alerts } = useAppSelector((state) => state.common);
  // const { countOfUnread } = useAppSelector((state) => state.notice);

  const { count: countOfUnread } = useCountUnread();

  const setUser = useStore((state) => state.setUser);

  // useeffect
  useEffect(() => {
    if (!user) {
      return;
    }
  }, []);

  useEffect(() => {
    setUser(user);
  }, [user]);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     alerts.length && handleReadAlert(0);
  //   }, 5_000);
  //
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [alerts]);

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
    // dispatch(readAlert(id));
  };

  return (
    <>
      <Drawer
        className="h-screen lg:drawer-open"
        sideClassName="drawer-side z-40"
        side={
          <aside className="h-full w-80 bg-base-100 lg:fixed">
            <div className="sticky top-0 items-center gap-2 bg-base-100 bg-opacity-90 px-4 py-2 backdrop-blur lg:flex">
              <Link
                className="btn btn-ghost mx-2 px-2 text-2xl font-bold normal-case"
                href="/"
              >
                Bob Works
              </Link>
            </div>

            <Menu className="w-80 p-2" size="md">
              <Menu.Item>
                <Link className={activeMenuItem('/')} href="/">
                  <LuLayoutDashboard />
                  대시보드
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link
                  className={activeMenuItem('/vacation/usage')}
                  href="/vacation/usage"
                >
                  <LuLayoutDashboard />
                  연차 사용 내역
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
                <Link
                  className={activeMenuItem('/request/holiday')}
                  href="/request/holiday"
                >
                  <MdOutlineHolidayVillage />
                  휴일 근무 보고서 신청
                </Link>
              </Menu.Item>
              <Menu.Item></Menu.Item>
              <Menu.Title>
                <h2>가계 대출</h2>
              </Menu.Title>
              <Menu.Item>
                <Link
                  className={activeMenu(segments, ['loan', 'add'])}
                  href="/loan/add"
                >
                  <IoAddCircleOutline />
                  대출 추가
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link
                  className={activeMenu(segments, ['loan', 'list'])}
                  href="/loan/list"
                >
                  <FaListUl />
                  대출 목록
                </Link>
              </Menu.Item>

              {MANAGER_ROLES.some((item) => item === user.role) && (
                <>
                  <Menu.Item></Menu.Item>
                  <Menu.Title>
                    <h2>고객의 소리</h2>
                  </Menu.Title>
                  <Menu.Item>
                    <Link
                      className={activeMenu(segments, ['chats'])}
                      href="/chats"
                    >
                      <FaListUl />
                      잼나는 소리들
                    </Link>
                  </Menu.Item>
                </>
              )}
            </Menu>
          </aside>
        }
        open={visible}
        onClickOverlay={toggleVisible}
      >
        <div className="sticky top-0 z-30 flex h-20 w-full justify-center bg-base-100 bg-opacity-90 text-base-content shadow-sm backdrop-blur transition-all duration-100">
          <Navbar className="">
            <Navbar.Start className="flex-none lg:hidden">
              <div className="flex-none lg:hidden">
                <Button shape="square" color="ghost" onClick={toggleVisible}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-6 w-6 stroke-current"
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
              <div className="mx-2 flex-1 px-2 text-2xl font-bold lg:hidden">
                Bob Works
              </div>
            </Navbar.Start>
            <Navbar.End className="lg:w-full">
              <div className="mr-5">
                <b>{user?.team?.name}</b> - <span>{user?.position?.name}</span>
                <b className="ml-4">{user?.name}</b>
              </div>
              <div className="relative mr-8">
                <Button
                  color="ghost"
                  shape="circle"
                  onClick={() => router.push('/notice')}
                >
                  <IoNotificationsOutline className="h-7 w-7" />
                </Button>
                {!!countOfUnread && (
                  <Badge
                    className="absolute right-1"
                    color="secondary"
                    size="md"
                  >
                    +{countOfUnread}
                  </Badge>
                )}
              </div>
              <Dropdown className="mr-10" hover end>
                <Avatar
                  src="/api/user/avatar"
                  size="sm"
                  shape="circle"
                  border
                />
                <Dropdown.Menu className="w-48 bg-base-100 shadow-xl">
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

        <div className="m-10 flex min-w-[746px] max-w-[1036px] items-center justify-center lg:ml-[350px]">
          {children}
        </div>

        <div className="fixed bottom-10 right-10">
          <div
            className={`absolute bottom-[80px] right-0 transition-all duration-300 ${
              showChat
                ? 'visible translate-y-0 opacity-100'
                : 'invisible translate-y-6 opacity-0'
            }`}
          >
            <CustomerChat user={user} />
          </div>
          <Tooltip
            className="hover:animate-bounce"
            message="무엇을 도와드릴까요?"
          >
            <Avatar
              size="sm"
              shape="circle"
              src="/customer_service_center.png"
              border
              color="accent"
              onClick={() => setShowChat(!showChat)}
            />
          </Tooltip>
        </div>
      </Drawer>
    </>
  );
}
