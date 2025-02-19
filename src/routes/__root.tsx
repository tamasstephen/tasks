import * as React from "react";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import styles from "@/styles/Nav.module.css";
import { Wrapper } from "@/components/common/Wrapper/Wrapper";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => <div>Not Found</div>,
});

function RootComponent() {
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <nav className={styles.nav}>
          <Wrapper>
            <div className={styles.navContainer}>
              <div className={styles.navLinks}>
                <Link to="/">Home</Link>
                <Link to="/board">Board</Link>
              </div>
            </div>
          </Wrapper>
        </nav>
        <div style={{ marginTop: "100px" }}>
          <Outlet />
        </div>
      </div>
    </React.Fragment>
  );
}
