import React from "react";
import { Link } from "react-router-dom";

export default function Loginnavigation() {
  return (
    <>
      <nav class="navbar navbar-expand-md navbar-dark bg-dark">
        <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <Link class="nav-link" to="/sign-in">
                Login
              </Link>
            </li>
            <li class="nav-item active">
              <Link class="nav-link" to="/sign-up">
                Sign Up
              </Link>
            </li>
          
          </ul>
        </div>
        <div class="mx-auto order-0">
          <Link class="navbar-brand mx-auto" to="/sign-in">
            TestSoft
          </Link>
          {/* <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target=".dual-collapse2"
          >
            <span class="navbar-toggler-icon"></span>
          </button> */}
        </div>
        <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <Link class="nav-link" to="#">
                Right
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="#">
                Link
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
