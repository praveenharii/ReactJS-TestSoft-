import React, {Link} from "react";


export default function Loginnavigation() {
  return (
    <>
      <nav class="navbar navbar-expand-md navbar-dark bg-dark">
        <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="/sign-in">
                Login
              </a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/sign-up">
                Sign Up
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Link
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Link
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Link
              </a>
            </li>
          </ul>
        </div>
        <div class="mx-auto order-0">
          <a class="navbar-brand mx-auto" href="/sign-in">
            TestSoft
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target=".dual-collapse2"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
        <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link" href="#">
                Right
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Link
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
  // <nav className="navbar navbar-expand-lg navbar navbar-light fixed-top">
  //   <div className="container">
  //     <a className="navbar-brand" href={"/sign-in"}>
  //       TestSoft
  //     </a>

  //     <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
  //       <ul className="navbar-nav ml-auto">
  //         <li className="nav-item left">
  //           <a className="nav-link" href={"/sign-in"}>
  //             Login
  //           </a>
  //         </li>
  //         <li className="nav-item">
  //           <a className="nav-link" href={"/sign-up"}>
  //             Sign up
  //           </a>
  //         </li>
  //       </ul>
  //     </div>
  //   </div>
  // </nav>;


//  <nav className="navbar navbar-expand-lg navbar-light fixed-top">
//           <div className="container">
//             <Link className="navbar-brand" to={'/sign-in'}>
//               TestSoft
//             </Link>
//             <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
//               <ul className="navbar-nav ml-auto">
//                 <li className="nav-item">
//                   <Link className="nav-link" to={'/sign-in'}>
//                     Login
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to={'/sign-up'}>
//                     Sign up
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </nav>

