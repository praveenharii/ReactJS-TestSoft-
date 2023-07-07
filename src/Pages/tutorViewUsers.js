import React, { useEffect, useState, useRef } from "react";
import {
  faCheckCircle,
  faTimesCircle,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import TopNavBar from "./Topsidenavbar/dash-basicTop-bar-Tutor-admin-Routes";
import TutorTopNavBar from "./Topsidenavbar/dash-basicTop-bar-Tutor-Routes";
import { Table, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import jwt_decode from "jwt-decode";
import { MDBSpinner } from "mdb-react-ui-kit";

export default function TutorViewUsers() {
  let userType = null;
  const token = window.localStorage.getItem("token");
  const decodedToken = jwt_decode(token);
  userType = decodedToken.userType;
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [pageCount, setPageCount] = useState(1);
  const currentPage = useRef();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  //  const [userType, setUserType] = useState("");

  useEffect(() => {
    currentPage.current = 1;

    const interval = setInterval(getPaginatedUsers, 3000);
    return () => clearInterval(interval);
  }, []);

  const getAlluser = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/tutorGetAllUsers`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        setData(data.data);
        //setUserType(data.data.userType);
      });
  };

  const deleteUser = (id, name) => {
    if (window.confirm(`Please Click Ok if you want to delete user ${name}`)) {
      fetch(`${process.env.REACT_APP_BASE_URL}/deleteUser`, {
        method: "DELETE",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          userid: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.data);
          getAlluser();
        });
    } else {
      console.log("Error");
    }
  };

  const makeRequestToDeleteUser = (id, name) => {
    if (
      window.confirm(
        `Please Click Ok if you want to Request Admin to delete user ${name}, admin will be notified by email.`
      )
    ) {
      fetch(`${process.env.REACT_APP_BASE_URL}/deleteUserRequest`, {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          userid: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.data);
        });
    } else {
      console.log("Error");
    }
  };

  function handlePageClick(e) {
    console.log(e);
    currentPage.current = e.selected + 1;
    getPaginatedUsers();
  }

  function changeLimit() {
    currentPage.current = 1;
    getPaginatedUsers();
  }

  function getPaginatedUsers() {
    //setLoading(true);
    fetch(
      `${process.env.REACT_APP_BASE_URL}/paginatedUsers?page=${currentPage.current}&limit=${limit}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        setPageCount(data.pageCount);
        setData(data.result);
        setLoading(false);
      });
  }

  const handleSearch = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/searchUsers?email=${searchQuery}`)
      .then((res) => res.json())
      .then((data) => {
        setSearchResults(data);
      });
  };

  useEffect(() => {
    if (searchQuery === "") {
      setSearchResults([]);
    }
  }, [searchQuery]);

  return (
    <>
      {userType === "Admin" ? <TopNavBar /> : <TutorTopNavBar />}

      <br />
      <div className="auth-wrapper" style={{ height: "auto" }}>
        <div className="auth-inner" style={{ width: "1000px" }}>
          <h3>View All Users</h3>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Email"
              aria-describedby="button-addon2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>New User Email</th>
                <th>Phone Number</th>
                <th>User Type</th>
                <th>Verification</th>
                <th>Status</th>
                <th>Delete User</th>
              </tr>
            </thead>
            {loading ? (
              <tbody>
                <tr>
                  <td colSpan="6">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "200px",
                      }}
                    >
                      <MDBSpinner type="border" color="secondary">
                        <span className="visually-hidden">Loading...</span>
                      </MDBSpinner>
                    </div>
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {(searchResults.length > 0 ? searchResults : data).map((i) => (
                  <tr key={i._id}>
                    <td>{`${i.fname} ${i.lname}`}</td>
                    <td>{i.email}</td>
                    <td>{i.phoneNumber}</td>
                    <td>{i.userType}</td>
                    <td>
                      {i.status === "verified" ? (
                        <div>
                          <FontAwesomeIcon
                            icon={faUserShield}
                            style={{ color: "green" }}
                          />
                          <span style={{ marginLeft: "5px" }}>Verified</span>
                        </div>
                      ) : (
                        <div>
                          <FontAwesomeIcon
                            icon={faUserShield}
                            style={{ color: "yellow" }}
                          />
                          <span style={{ marginLeft: "5px" }}>Pending</span>
                        </div>
                      )}
                    </td>
                    <td>
                      {i.isOnline ? (
                        <div>
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            style={{ color: "green" }}
                          />
                          <span style={{ marginLeft: "5px" }}>Online</span>
                        </div>
                      ) : (
                        <div>
                          <FontAwesomeIcon
                            icon={faTimesCircle}
                            style={{ color: "red" }}
                          />
                          <span style={{ marginLeft: "5px" }}>Offline</span>
                        </div>
                      )}
                    </td>
                    <td>
                      {userType !== "Tutor" ? (
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => deleteUser(i._id, i.fname)}
                          >
                            Delete
                          </Button>
                        </td>
                      ) : (
                        <td>
                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Request admin to delete</Tooltip>}
                          >
                            <Button
                              variant="danger"
                              onClick={() =>
                                makeRequestToDeleteUser(i._id, i.fname)
                              }
                            >
                              Request
                            </Button>
                          </OverlayTrigger>
                        </td>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </Table>
          <br />
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Limit To View Users"
              aria-describedby="button-addon2"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              onClick={changeLimit}
            >
              Set Limit
            </button>
          </div>
          <br />

          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={10}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            marginPagesDisplayed={2}
            containerClassName="pagination justify-content-center"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            activeClassName="active"
            forcePage={currentPage.current - 1}
          />
        </div>
      </div>
    </>
  );
}
