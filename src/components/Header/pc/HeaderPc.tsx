import { Dropdown, Image, Input, Layout } from "antd";
import classNames from "classnames/bind";
import React, { FC, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { getLocalStorage } from "@/utils/StorageUtils";
import styles from "./HeaderPc.module.less";

const TAB_CONFIG = [
  { name: "首页", key: "home", route: "/home", id: 1 },
  { name: "资源", key: "source", route: "/source", id: 2 },
  { name: "经验", key: "article", route: "/article", id: 3 },
  { name: "图库", key: "gallery", route: "/image", id: 4 },
  { name: "导航", key: "navigation", route: "/navigation", id: 5 },
];

const { Header: AntdHeader } = Layout;
const cx = classNames.bind(styles);
interface HeaderPcProps {
  isPlaceholder?: boolean; // 是否占位
  isTransparent?: boolean; // 是否透明
  onSearch?: (searchWord: string) => void;
  defaultSearchWord?: string; // 搜索框默认值
  onChange?: (value: string) => void; // 输入值回调
}
const HeaderPC: FC<HeaderPcProps> = (props) => {
  const navigate = useNavigate();

  const {
    isPlaceholder,
    isTransparent,
    onSearch,
    defaultSearchWord,
    onChange,
  } = props;
  const [searchWord, setSearchWord] = useState(defaultSearchWord || "");

  useEffect(() => {
    setSearchWord(defaultSearchWord || "");
  }, [defaultSearchWord]);

  const renderOperationView = () => {
    return (
      <div className={cx("operation_view_box")}>
        <div className={cx("operation_view_top")}>
          <div className={cx("head_portrait")}>
            <Image src="https://image.soutushenqi.com/upload_d267627ef1238071f09a76ab1a67c0aa.png" />
          </div>
          <div className={cx("phone_num_info")}>
            {/* {returnDesensitizationPhoneNum(userInfo?.phoneNum || "")} */}
            123456789
          </div>
        </div>
        <div className={cx("operation_view_line")} />
        <div
          className={cx("operation_view_item")}
          onClick={() => {
            navigate("/user");
          }}
        >
          <span className={cx("drawer_my_icon")} />
          个人信息
        </div>
        <div className={cx("operation_view_item")}>
          <span className={cx("vip_linear_dark_icon")} />
          我的会员
        </div>
        <div className={cx("operation_view_line")} />
        <div className={cx("operation_view_item")}>
          <span className={cx("my_collection_icon")} />
          我的收藏
        </div>
        <div className={cx("operation_view_item")}>
          <span className={cx("my_order_icon")} />
          我的订单
        </div>
        <div className={cx("operation_view_line")} />
        <div className={cx("operation_view_item")}>
          <span className={cx("exit_icon")} />
          退出登录
        </div>
      </div>
    );
  };

  return (
    <>
      <AntdHeader
        className={cx("antd_header_wrap", { transparent: isTransparent })}
      >
        <div className={cx("header_wrap")} id="headerWrap">
          <Link className={cx("logo")} to="/">
            123456
          </Link>
          <div className={cx("tab_wrap")}>
            {TAB_CONFIG.map((value) => {
              return (
                <NavLink
                  className={({ isActive }) =>
                    cx("tab_item", { active: isActive })
                  }
                  to={value.route}
                  key={value.id}
                >
                  {value.name}
                </NavLink>
              );
            })}
          </div>
          <div
            className={cx("search_bar")}
            style={{
              opacity: onSearch ? 1 : 0,
              visibility: onSearch ? "visible" : "hidden",
            }}
          >
            <Input
              placeholder="搜索资料素材"
              onChange={(e) => {
                setSearchWord(e.target.value);
                if (onChange) {
                  onChange(e.target.value);
                }
              }}
              onPressEnter={() => {
                if (onSearch) {
                  onSearch(searchWord);
                }
              }}
              value={searchWord}
            />
            <span
              className={cx("search_icon")}
              onClick={() => {
                if (onSearch) {
                  onSearch(searchWord);
                }
              }}
            />
          </div>
          <div
            className={cx("vip_icon_box", {
              active: true,
            })}
            onClick={() => {
              navigate("/vip");
            }}
          >
            <span className={cx("vip_icon")} />
            开通会员
          </div>
          {getLocalStorage("userName") ? (
            <Dropdown
              overlay={renderOperationView}
              placement="bottomLeft"
              getPopupContainer={() =>
                document.getElementById("headerWrap") || document.body
              }
            >
              <div
                className={cx("head_info")}
                onClick={() => {
                  navigate("/user/info");
                }}
              >
                123456
              </div>
            </Dropdown>
          ) : (
            <div className={cx("login_entrance")}>
              <span
                onClick={() => {
                  navigate("/login");
                }}
              >
                登录
              </span>
              <span>|</span>
              <span
                onClick={() => {
                  navigate("/login/1");
                }}
              >
                注册
              </span>
            </div>
          )}
        </div>
      </AntdHeader>
      {isPlaceholder ? <div className={cx("placeholder_box")} /> : null}
    </>
  );
};

HeaderPC.defaultProps = {
  isPlaceholder: false,
  isTransparent: false,
  onSearch: undefined,
  defaultSearchWord: "",
  onChange: undefined,
};

export default HeaderPC;
