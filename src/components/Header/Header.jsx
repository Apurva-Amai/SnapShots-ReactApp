import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Container, Logo, LogoutBtn } from "../index";
import { useEffect, useState } from "react";
import authService from "../../appwrite/auth";

function Header() {
  const authStatus = useSelector((state) => state.auth.userStatus); // get the auth status from the store
  // const navigate = useNavigate()

  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await authService.getCurrentUser();
        setUsername(data.name);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    if (authStatus) {
      fetchUserData();
    }
  }, [authStatus]);

  const navItems = [
    {
      name: "Home",
      path: "/",
      active: "true",
    },
    {
      name: "Login",
      path: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      path: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      path: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      path: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow bg-gray-500 ">
      <Container>
        <nav className="flex">
          <div className="flex">
            <Link to="/">
              <Logo width="40px" />
            </Link>
            <div className="text-xl content-center capitalize ml-4">
              {authStatus ? username : null}
            </div>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "outline-dashed outline-1 outline-black"
                          : "text-black"
                      } inline-block px-6 py-2 active:bg-blue-100 rounded-full duration-200`
                    }
                  >
                    {" "}
                    {item.name}
                  </NavLink>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                {" "}
                <LogoutBtn />{" "}
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

{
  /* <button onClick={() => navigate(item.path)}> {item.name} </button>    // another way to navigate */
}

export default Header;
