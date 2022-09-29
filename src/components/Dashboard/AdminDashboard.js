import React, { Component } from "react";
import "./AdminDashboard.css";

import "./CustomerDashboard.css"
// import GetMenuItem from "../Product/GetMenuItem";
// import GetUserMenus from "../Product/GetUserMenus";
import AuthServices from "../../configurations/AuthServices";
import TextField from "@material-ui/core/TextField";
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import moment from 'moment';
// import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
// import CustomerServices from "../../services/CustomerServices";

import AppBar from "@material-ui/core/AppBar";
import KitchenIcon from '@material-ui/icons/Kitchen';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import ViewListIcon from "@material-ui/icons/ViewList";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import DeleteIcon from "@material-ui/icons/Delete";
import Backdrop from "@material-ui/core/Backdrop";
import Pagination from "@material-ui/lab/Pagination";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Rating from "@material-ui/lab/Rating";

//Table Library
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableCell from "@material-ui/core/TableCell";
import { FormatListNumbered } from "@material-ui/icons";



const authServices = new AuthServices();

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
});

// const productServices = new ProductServices();
// const customerServices = new CustomerServices();


class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {

      orderTableData: [],
      FeedBackDetailsData: [],
      CustomerListData: [],
      ActiveUserCustomerList: [],
      CurrentUser: [],
      TiffinData: [],
      AddressData: [],
      forceUpdate: false,
      Message: "",
      //
      NumberOfRecordPerPage: 6,
      PageNumber: 1,

      FeedbackPageNumber: 1,
      TotalPages: 0,
      TotalRecords: 0,

      Open: false,
      OpenEdit: false, // Open Editing Booking Model
      OpenLoader: false,
      OpenSnackBar: false,

      OpenHome: true,
      OpenAddProduct: false,
      OpenOrderList: false,
      OpenFeedBack: false,

      OrderList: true,
      PlusHomeDataCurrent: false,
      ProductListData: [],
      TransportList: [],


      ProdtName: "",
      productType: "",
      ProductPrice: "",
      productDetile: "",
      ProductCompany: "",
      productIdSave: "",
      ProdQuanity:"",
      bannerImageProduct: new FormData(),


      ProdtNameFlag: false,
      ProdQuanityFlag:false,
      productTypeFlag: false,
      ProductPriceFlag: false,
      productDetilsFlag: false,
      ProductCompanyFlag: false,
      buttonChange: true,


      OpenUserHome: true,
      tableDataProductListAdmin: true,
      tableDatCustomerListManagement: true,
      FeedBackDetails: false



    };
  }

  //
  componentWillMount() {

    this.GetAllOrderDetails(this.state.PageNumber);
    // this.handleFeedBackAdmin(this.state.PageNumber)

  }

  //AddMenuItem GetMenuItem UpdateMenuItem DeleteMenuItem GetCustomerOrderList UpdateOrderStatus

  GetAllOrderDetails = async (CurrentPage) => {
    debugger
    console.log("Get User Appointments Calling ... ");

    let data = {
      "page": CurrentPage,
      "size": 15
    }

    authServices
      .AllAdminOrdersList(data)
      .then((data) => {
        console.log("GetUserAppointments Data : ", data);
        // debugger
        if (data.data.data !== null) {

          this.setState({
            orderTableData: data.data.data.content,
            TotalPages: data.data.data.totalPages,
            // PageNumber: data.data.data.number,
            OpenLoader: false,
          });
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
  };

  handledeleteAdminOrderList = (id) => {
    authServices

      .deleteadminorderlist(id)
      .then((data) => {
        console.log("filedata : ", data);
        debugger
        if (data.data.data !== null) {

          this.setState({
            OpenLoader: false,
            OpenSnackBar: true,
            Message: data.data.message
          });
          this.GetAllOrderDetails()
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
  }

  handledeleteCustomerListAdmin = (id) => {
    authServices

      .deleteadminCustomerlist(id)
      .then((data) => {
        console.log("filedata : ", data);
        debugger
        if (data.data !== null) {

          this.setState({
            OpenLoader: false,
            OpenSnackBar: true,
            Message: data.data.message
          });
          this.handleCustomerListData(this.state.PageNumber)

        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
  }








  handleInputChangeDeliveryboy = (e) => {
    let val = e.target.value
    if (e.target.name === "Firstname") {
      this.setState({
        Firstname: e.target.value,
        FirstnameFlag: false
      })
    }
    if (e.target.name === "Lastname") {
      this.setState({
        Lastname: e.target.value,
        LastnameFlag: false
      })
    }
    if (e.target.name === "EmailId") {
      this.setState({
        EmailId: e.target.value,
        EmailIdFlag: false
      })
    }
    if (e.target.name === "Password") {
      this.setState({
        Password: e.target.value,
        PasswordFlag: false
      })
    }
    if (e.target.name === "AdharNo") {
      this.setState({
        AdharNo: e.target.value,
        AdharNoFlag: false
      })
    }
    this.setState({
      [e.target.name]: e.target.value
    }, () => console.log("e.target.name", e.target.value))

  }




  handleClose = () => {
    console.log("Handle Close Calling ...");
    this.setState({
      open: false,
      Update: false,
      OpenEdit: false,
      OpenBookModel: false,
    });
  };

  handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ OpenSnackBar: false });
  };









  handlePaging = async (e, value) => {
    debugger
    let state = this.state;
    console.log("Current Page : ", value);

    this.setState({
      PageNumber: value,
    });

    if (this.state.OpenHome) {
      await this.GetAllOrderDetails(value);

    }
    if (this.state.FeedBackDetails) {
      await this.handleFeedBackAdmin(value)
    }
    if (this.state.CustomerListManagement) {
      await this.handleCustomerListData(value)
    }

    if (this.state.ProductListAdmin) {
      await this.GetAllAdminProductList(value)
    }


  };

  // setItemTypeRadioValue = async (ID, value) => {
  //   console.log("setItemTypeRadioValue Value : ", value);

  //   if (this.state.OpenHome) {
  //     this.setState({ ItemTypeRadioValue: value });
  //     this.GetMenuItem(1, value);
  //   } else if (this.state.OpenOrderList) {
  //     this.setState({ OrderStatusRadioValue: value });
  //     await this.UpdateOrderStatus(ID, value);
  //   }
  // };

  SignOut = async () => {
    await localStorage.removeItem("token");
    localStorage.clear()
    this.props.history.push("/SignIn");
  };


  //

  handleHomeNav = () => {
    this.setState({
      OpenUserHome: true,
      FeedBackDetails: false,
      CustomerListManagement: false,
      ProductListAdmin: false,
      TransportList: false,
      OpenCard: false,
    });

    this.GetAllOrderDetails(this.state.PageNumber);
  };

  handleFeedBackDetails = () => {
    this.setState({
      OpenUserHome: false,
      FeedBackDetails: true,
      TransportList: false,
      CustomerListManagement: false,
      ProductListAdmin: false,
      OpenCard: false,
    });
    this.handleFeedBackAdmin(this.state.PageNumber)
  }

  handleCustomerList = () => {
    this.setState({
      OpenUserHome: false,
      FeedBackDetails: false,
      CustomerListManagement: true,
      ProductListAdmin: false,
      TransportList: false
      // OpenCard: false,
    });
    this.handleCustomerListData(this.state.PageNumber)
  }

  handleProductList = () => {
    this.setState({
      OpenUserHome: false,
      FeedBackDetails: false,
      CustomerListManagement: false,
      ProductListAdmin: true,
      OpenCard: false,
      TransportList: false
    });

    this.GetAllAdminProductList(this.state.PageNumber)
  }

  handleTransportList = () => {
    this.setState({
      OpenUserHome: false,
      FeedBackDetails: false,
      CustomerListManagement: false,
      ProductListAdmin: false,
      OpenCard: false,
      TransportList: true
    });

    this.handleAllTrasportDetails(this.state.PageNumber)
  }






  handlePluseIcon = () => {
    this.setState({
      tableDataDeliveryBoy: false,
      pluseCreateDataDeliveryBoy: true
    })

  }

  handlePluseIconCustomerList = (CurrentPage) => {
    authServices
      .ActiveUserCustomerList(CurrentPage, 5)
      .then((data) => {
        console.log("ActiveUserCustomerList : ", data);
        // debugger
        if (data.data.data !== null) {

          this.setState({
            ActiveUserCustomerList: data.data.data.content,
            TotalPages: data.data.data.totalPages,
            PageNumber: data.data.data.number,
            OpenLoader: false,
            tableDatCustomerListManagement: false,
            PluseCustomerListManagement: true
          });
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });

  }

  handlePluseIconProductListAdmin = () => {
    this.setState({
      tableDataProductListAdmin: false,
      pluseDataProductListAdmin: true
    })
  }






  handleCustomerListData = (CurrentPage) => {
    let data = {
      "page": CurrentPage,
      "size": 15
    }

    authServices
      .AllCustomerList(data)
      .then((data) => {
        console.log("FeedBackDetailsData : ", data);
        // debugger
        if (data.data.data !== null) {

          this.setState({
            CustomerListData: data.data.data.content,
            TotalPages: data.data.data.totalPages,
            // PageNumber: data.data.data.number,
            OpenLoader: false,
          });
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
  }

  filechangehandler = (e) => {
    console.log("filename", e.target.files)
    this.setState({
      fdata: e.target.files[0],
      forceUpdate: !this.state.forceUpdate
    })

  }



  handleClose = () => {
    this.setState({
      openModel: false
    })

  };


  getModalStyle = () => {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  handledeleteAdmin = (id) => {
    authServices

      .DeleteAdminData(id)
      .then((data) => {
        console.log("filedata : ", data);
        debugger
        if (data.data.data !== null) {

          this.setState({
            OpenLoader: false,
            OpenSnackBar: true,
            Message: data.data.message
          });
          this.GetAllOrderDetails()
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
  }

  ///////////////////////////////////////////////////////////////////

  handleInputChangeProductSell = (e) => {
    let val = e.target.value
    if (e.target.name === "ProdtName") {
      this.setState({
        ProdtName: e.target.value,
        ProdtNameFlag: false
      })
    }
    if (e.target.name === "ProductPrice") {
      this.setState({
        ProductPrice: e.target.value,
        ProductPriceFlag: false
      })
    }
    if (e.target.name === "productType") {
      this.setState({
        productType: e.target.value,
        productTypeFlag: false
      })
    }
    if (e.target.name === "ProdQuanity") {
      this.setState({
        ProdQuanity: e.target.value,
        ProdQuanityFlag: false
      })
    }
    if (e.target.name === "productDetile") {
      this.setState({
        productDetile: e.target.value,
        productDetilsFlag: false
      })
    }
    if (e.target.name === "ProductCompany") {
      this.setState({
        ProductCompany: e.target.value,
        ProductCompanyFlag: false
      })
    }



    this.setState({
      [e.target.name]: e.target.value
    }, () => console.log("e.target.name", e.target.value))

  }



  CheckValidationProductSell = () => {
    const { ProdtName, ProductPrice, productType, ProductCompany, productDetile, bannerImageProduct, ProdQuanity } = this.state
    console.log("CheckValidation Calling...");


    // this.setState({ EmailIDFlag: false, UnitFlag: false });

    if (ProdtName === "") {
      this.setState({
        ProdtNameFlag: true
      })
    }
    if (ProductPrice === "") {
      this.setState({
        ProductPriceFlag: true
      })
    }
    if (productType === "") {
      this.setState({
        productTypeFlag: true
      })
    }
    if (ProdQuanity === "") {
      this.setState({
        ProdQuanityFlag: true
      })
    }
    if (productDetile === "") {
      this.setState({
        productDetilsFlag: true
      })
    }
    if (ProductCompany === "") {
      this.setState({
        ProductCompanyFlag: true
      })
    }
    if (bannerImageProduct === "") {
      document.getElementById("filedata").classList.add("validation")
    }


  }

  GetAllAdminProductList = async (CurrentPage) => {
    let data = {
      "page": CurrentPage,
      "size": 15
    }

    authServices
      .AllAdminProductList(data)
      .then((data) => {
        console.log("AddressData Data : ", data);
        // debugger
        if (data.data.data !== null) {

          this.setState({
            ProductListData: data.data.data.content,

            OpenLoader: false,
          });
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
  };

  handleProductOrderSubmit = (e) => {
    e.preventDefault()
    debugger
    let FarmerID = localStorage.getItem("FarmerID")
    this.CheckValidationProductSell()
    let fdataa = new FormData();

    fdataa.append("name", this.state.ProdtName);
    fdataa.append("price", this.state.ProductPrice);
    fdataa.append("type", this.state.productType)
    fdataa.append("quantity", this.state.ProdQuanity)
    fdataa.append("details", this.state.productDetile)
    fdataa.append("company", this.state.ProductCompany)
    fdataa.append("bannerImage", this.state.bannerImageProduct)


    authServices

      .AddProductDetailsAdmin(fdataa)
      .then((data) => {
        console.log("filedata : ", data);
        debugger
        if (data.data.data !== null) {

          this.setState({
            ProdtName: "",
            ProductPrice: "",
            productType: "",
            ProdQuanity:"",
            productDetile: "",
            ProductCompany: "",
            bannerImageProduct: "",

            tableDataProductListAdmin: true,
            OpenLoader: false,
            OpenSnackBar: true,
            Message: data.data.message
          });
          this.GetAllAdminProductList(this.state.PageNumber)
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
  }
  handleProductOrderUpdate = (e) => {
    e.preventDefault()
    debugger
 
    this.CheckValidationProductSell()
    let fdataa = new FormData();
    fdataa.append("productId", this.state.productIdSave);
    fdataa.append("name", this.state.ProdtName);
    fdataa.append("price", this.state.ProductPrice);
    fdataa.append("type", this.state.productType)
    fdataa.append("quantity", this.state.ProdQuanity)
    fdataa.append("details", this.state.productDetile)
    fdataa.append("company", this.state.ProductCompany)
    fdataa.append("bannerImage", this.state.bannerImageProduct)
       authServices

      .UpdateProductDetailsAdminStatus(fdataa)
      .then((data) => {
        console.log("filedata : ", data);
        debugger
        if (data.data.data !== null) {

          this.setState({
            ProdtName: "",
            ProductPrice: "",
            productType: "",
            productDetile: "",
            ProdQuanity:"",
            ProductCompany: "",
            bannerImageProduct: "",

            tableDataProductListAdmin: true,
            OpenLoader: false,
            OpenSnackBar: true,
            Message: data.data.message
          });
          this.GetAllAdminProductList(this.state.PageNumber)
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });

  }

  handledeleteAdminProduct = (id) => {
    debugger

    authServices
      .DeleteAdminDataProduct(id)
      .then((data) => {
        console.log("filedata : ", data);
        debugger
        if (data.data.success) {

          this.setState({
            OpenLoader: false,
            OpenSnackBar: true,
            Message: data.data.message
          });
          this.GetAllAdminProductList(this.state.PageNumber)
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
  }

  HandleEditProductDetails = (productId, name, bannerUrl, type, details, company, price,quantity) => {
    this.setState({
      ProdtName: name,
      bannerImageProduct: bannerUrl,
      productType: type,
      ProdQuanity:quantity,

      ProductPrice: price,
      ProductCompany: company,
      productDetile: details,
      tableDataProductListAdmin: false,
      productIdSave: productId,
      buttonChange: false
    })

  }

  /////////////////////////////////////////////////////////////////

  handleFeedBackAdmin = (CurrentPage) => {
    let data = {
      "page": CurrentPage,
      "size": 15
    }
    authServices
      .AllFeedbackAdminList(data)
      .then((data) => {
        console.log("FeedBackDetailsData : ", data);
        // debugger
        if (data.data.data !== null) {

          this.setState({
            FeedBackDetailsData: data.data.data.content,
            TotalPages: data.data.data.totalPages,
            // PageNumber: data.data.data.number,
            OpenLoader: false,
          });
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
  }


  handledeleteFeedback = (id) => {
    authServices
      .deleteFeedback(id)
      .then((data) => {
        console.log("filedata : ", data);
        debugger
        if (data.data.success) {

          this.setState({
            OpenLoader: false,
            OpenSnackBar: true,
            Message: data.data.message
          });
          this.handleFeedBackAdmin(this.state.PageNumber)
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
  }

  handlePluseIconHome = () => {
    this.setState({
      tableDataProductListAdmin: false
    })
  }

  filechangehandler = (e) => {
    console.log("filename", e.target.files)
    this.setState({
      bannerImageProduct: e.target.files[0],
      forceUpdate: !this.state.forceUpdate
    })
  }

  render() {

    let state = this.state;
    let self = this;

    const { OpenUserHome, ProductListData, OrderList, orderTableData, FeedBackDetailsData, CustomerListData, OpenSnackBar, Message, tableDatCustomerListManagement, PluseCustomerListManagement, tableDataDeliveryBoy, TiffinData, openModel,
      FeedBackDetails, CustomerListManagement, ProductListAdmin, tableDataProductListAdmin, ProdtName, productType, ProductPrice, productDetile, ProductCompany, bannerImageProduct, ProdtNameFlag, productTypeFlag, ProductPriceFlag, productDetilsFlag, ProductCompanyFlag, ProdQuanityFlag,ProdQuanity } = this.state
    console.log("state : ", state);
    const { classes } = this.props;
    return (

      <div className="AdminDashboard-Container">

        <div className="Sub-Container">
          <div className="Header">
            <AppBar position="static" style={{ backgroundColor: "#006b00" }}>
              <Toolbar>
                <Typography
                  variant="h6"
                  style={{
                    flexGrow: 3,
                    display: "flex",
                    padding: "5px 0 0 21px",
                    boxSizing: "border-box",
                  }}
                >
                  GreenBee (Admin)

                </Typography>
               
                <div>
                <Button
                  color="inherit"
                  onClick={() => {
                    this.SignOut();
                  }}
                >
                  LogOut
                </Button>
                <h4>{localStorage.getItem("firstName")}</h4></div>
              </Toolbar>
            </AppBar>
          </div>
          <div className="Body">
            <div className="Sub-Body">
              <div className="SubBody11">
                <div
                  className={OpenUserHome ? "NavButton1" : "NavButton2"}
                  onClick={() => {
                    this.handleHomeNav();
                  }}
                >

                  <div className="NavButtonText">Order List</div>
                </div>

                <div
                  className={CustomerListManagement ? "NavButton1" : "NavButton2"}
                  onClick={() => {
                    this.handleCustomerList();
                  }}
                >

                  <div className="NavButtonText">Customer List</div>
                </div>
                <div
                  className={ProductListAdmin ? "NavButton1" : "NavButton2"}
                  onClick={() => {
                    this.handleProductList();
                  }}
                >

                  <div className="NavButtonText">Product List</div>
                </div>

                <div
                  className={FeedBackDetails ? "NavButton1" : "NavButton2"}
                  onClick={() => {
                    this.handleFeedBackDetails();
                  }}
                >

                  <div className="NavButtonText">FeedBack</div>
                </div>
              </div>
              <div className="SubBody21">
                <div className="bodyContent">
                  {OpenUserHome &&
                    <>
                      {/* <div>
                        <TextField
                          type="date"
                          className="textFieldDate"
                          id="OrderDate"
                          name="OrderDate"
                          label="Order Date"
                          placeholder="dd-mm-yyyy"
                          size="small"
                          style={{ margin: 20 }}
                          // error={OrderDateFlag}
                          // value={OrderDate}
                          // onChange={(e) => this.handleInputChangeMyorder(e)}
                          InputLabelProps={{
                            shrink: true,
                          }}

                        />
                      </div> */}

                      {OrderList &&
                        <>  <div className="GetUserMenus-SubContainerAdmin ">
                          <TableContainer component={Paper}>
                            <Table className="" aria-label="simple table">
                              {/* {props.State === "UserHome" ? ( */}
                              <>
                                <TableHead></TableHead>
                                <TableHead>
                                  <TableRow>
                                    <TableCell
                                      align="center"
                                      style={{ width: 50, fontWeight: 600, fontSize: 15 }}
                                    >
                                      Order ID
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      style={{ width: 200, fontWeight: 600, fontSize: 15 }}
                                    >
                                      Product Name
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                    >
                                      Order image
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      style={{ width: 210, fontWeight: 600, fontSize: 15 }}
                                    >
                                      Quantity
                                    </TableCell>

                                    <TableCell
                                      align="center"
                                      style={{ width: 210, fontWeight: 600, fontSize: 15 }}
                                    >
                                      Price
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      style={{ width: 210, fontWeight: 600, fontSize: 15 }}
                                    >
                                      Address
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      style={{ width: 210, fontWeight: 600, fontSize: 15 }}
                                    >
                                      Payment Type
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      style={{ width: 210, fontWeight: 600, fontSize: 15 }}
                                    >
                                      Customer Name
                                    </TableCell>


                                    <TableCell
                                      align="center"
                                      style={{ width: 210, fontWeight: 600, fontSize: 15 }}
                                    >
                                      Actions
                                    </TableCell>

                                  </TableRow>
                                </TableHead>
                              </>
                              {/* ) : ( */}
                              <></>
                              {/* )} */}
                              <TableBody>
                                {orderTableData.length > 0
                                  ? orderTableData.map((data, index) => {
                                    return (
                                      <TableRow >
                                        {/* {props.State === "UserHome" ? ( */}
                                        <>
                                          <TableCell align="center" style={{ width: 200 }}>
                                            {data.orderId}

                                          </TableCell>
                                          <TableCell align="center" style={{ width: 200 }}>
                                            {data.product.name}

                                          </TableCell>
                                          <TableCell align="center" style={{ width: 100 }}>
                                            <img className="bannerurl" src={data.product.imageUrl} alt="Girl in a jacket" />

                                          </TableCell>
                                          <TableCell align="center" style={{ width: 100 }}>
                                            {data.quantity}
                                          </TableCell>
                                          <TableCell align="center" style={{ width: 100 }}>
                                            {data.payment.price}
                                          </TableCell>
                                          <TableCell align="center" style={{ width: 100 }}>
                                            {data.address}
                                          </TableCell>
                                          <TableCell align="center" style={{ width: 100 }}>
                                            {data.payment.paymentMode}
                                          </TableCell>
                                          <TableCell align="center" style={{ width: 100 }}>
                                            {data.user.firstName}

                                          </TableCell>

                                          <TableCell align="center" style={{ width: 100 }}>
                                            <DeleteIcon style={{ cursor: "pointer" }} onClick={() => this.handledeleteAdminOrderList(data.id)} />

                                          </TableCell>
                                          {/* <TableCell align="center" style={{ width: 100 }}>
                                          {data.totalPrice}1213132314
                                        </TableCell> */}

                                        </>
                                        {/* ) : ( */}
                                        <></>
                                        {/* )} */}
                                      </TableRow>
                                    );
                                  })
                                  : null}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </div>


                        </>


                      }


                    </>

                  }
                  {FeedBackDetails &&
                    <>                      {/* <div className="deliveryboybtn mb-4">Delivery Boy <ControlPointIcon onClick={() => this.handlePluseIcon()} /> </div> */}
                      <div className="GetUserMenus-SubContainerAdmin">
                        <TableContainer component={Paper}>
                          <Table className="tableDeliveryboy" aria-label="simple table">

                            <>
                              <TableHead></TableHead>
                              <TableHead>
                                <TableRow>
                                  <TableCell
                                    align="Left"
                                    style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                  >
                                    Id
                                  </TableCell>
                                  <TableCell
                                    align="Left"
                                    style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                  >
                                    Customer Name
                                  </TableCell>
                                  <TableCell
                                    align="Left"
                                    style={{ width: 150, fontWeight: 600, fontSize: 15 }}
                                  >
                                    Product Name
                                  </TableCell>
                                  <TableCell
                                    align="Left"
                                    style={{ width: 193, fontWeight: 600, fontSize: 15 }}
                                  >
                                    Feedback
                                  </TableCell>
                                  <TableCell
                                    align="Left"
                                    style={{ width: 193, fontWeight: 600, fontSize: 15 }}
                                  >
                                    Action
                                  </TableCell>


                                </TableRow>
                              </TableHead>
                            </>

                            <TableBody>
                              {FeedBackDetailsData.length > 0
                                ? FeedBackDetailsData.map((data, index) => {
                                  return (
                                    <TableRow key={index}>

                                      <>
                                        <TableCell align="Left" style={{ width: 200 }}>
                                          {data.feedbackId}
                                        </TableCell>
                                        <TableCell align="Left" style={{ width: 200 }}>
                                          {data.user.firstName}
                                        </TableCell>
                                        <TableCell align="Left" style={{ width: 200 }}>
                                          {data.product.name}
                                        </TableCell>
                                        <TableCell align="Left" style={{ width: 100 }}>
                                          {data.feedback}
                                        </TableCell>
                                        <TableCell align="Left" style={{ width: 100 }}>
                                          <DeleteIcon style={{ cursor: "pointer" }} onClick={() => this.handledeleteFeedback(data.feedbackId)} />

                                        </TableCell>


                                      </>

                                      {/* )} */}
                                    </TableRow>
                                  );
                                })
                                : null}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </div>
                    </>


                  }

                  {CustomerListManagement &&
                    <>
                      {tableDatCustomerListManagement &&
                        // <div>
                        <>
                          {/* <div className="deliveryboybtn mb-4"> Active Customers <ControlPointIcon onClick={() => this.handlePluseIconCustomerList(this.state.PageNumber)} /> </div> */}
                          <div className="GetUserMenus-SubContainerAdmin">
                            <TableContainer component={Paper}>
                              <Table className="tableDeliveryboy" aria-label="simple table">

                                <>
                                  <TableHead></TableHead>
                                  <TableHead>
                                    <TableRow>
                                      <TableCell
                                        align="Left"
                                        style={{ width: 50, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Id
                                      </TableCell>
                                      <TableCell
                                        align="Left"
                                        style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                      >
                                        First Name
                                      </TableCell>
                                      <TableCell
                                        align="Left"
                                        style={{ width: 150, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Last Name
                                      </TableCell>
                                      <TableCell
                                        align="Left"
                                        style={{ width: 193, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Email Id
                                      </TableCell>
                                      <TableCell
                                        align="Left"
                                        style={{ width: 193, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Created on
                                      </TableCell>

                                      <TableCell
                                        align="Left"
                                        style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Role
                                      </TableCell>
                                      <TableCell
                                        align="Left"
                                        style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Action
                                      </TableCell>


                                    </TableRow>
                                  </TableHead>
                                </>

                                <TableBody>
                                  {CustomerListData.length > 0
                                    ? CustomerListData.map((data, index) => {
                                      return (
                                        <TableRow >

                                          <>
                                            <TableCell align="Left" style={{ width: 200 }}>
                                              {data.userId}
                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 200 }}>
                                              {data.firstName}
                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 100 }}>
                                              {data.lastName}
                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 100 }}>
                                              {data.email}
                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 100 }}>
                                              {moment(data.createdOn).format("DD-MM-YYYY").toString()}

                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 100 }}>
                                              {data.role}
                                            </TableCell>
                                            <TableCell align="center" style={{ width: 100 }}>
                                              <DeleteIcon style={{ cursor: "pointer" }} onClick={() => this.handledeleteCustomerListAdmin(data.userId)} />

                                            </TableCell>

                                          </>

                                          {/* )} */}
                                        </TableRow>
                                      );
                                    })
                                    : null}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </div>
                        </>
                        // </div>
                      }

                    </>}

                  {ProductListAdmin &&
                    <>

                      {tableDataProductListAdmin ?
                        <>

                          <div className="deliveryboybtn mb-4">Add Product <ControlPointIcon onClick={() => this.handlePluseIconHome(this.state.PageNumber)} /> </div>

                          <div className="GetUserMenus-SubContainerAdmin">
                            <TableContainer component={Paper}>
                              <Table className="" aria-label="simple table">
                                {/* {props.State === "UserHome" ? ( */}
                                <>
                                  <TableHead></TableHead>
                                  <TableHead>
                                    <TableRow>
                                      <TableCell
                                        align="center"
                                        style={{ width: 50, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Product ID
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        style={{ width: 200, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Product Name
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Product image
                                      </TableCell>

                                      <TableCell
                                        align="center"
                                        style={{ width: 210, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Product Type
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        style={{ width: 210, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Product Quantity(kg)
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        style={{ width: 210, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Product Description
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        style={{ width: 210, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Product Company
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        style={{ width: 210, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Product Price
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        style={{ width: 210, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Actions
                                      </TableCell>



                                    </TableRow>
                                  </TableHead>
                                </>
                                {/* ) : ( */}
                                <></>
                                {/* )} */}
                                <TableBody>
                                  {ProductListData.length > 0
                                    ? ProductListData.map((data, index) => {
                                      return (
                                        <TableRow >
                                          {/* {props.State === "UserHome" ? ( */}
                                          <>
                                            <TableCell align="center" style={{ width: 200 }}>
                                              {data.productId}

                                            </TableCell>
                                            <TableCell align="center" style={{ width: 200 }}>
                                              {data.name}

                                            </TableCell>
                                            <TableCell align="center" style={{ width: 100 }}>
                                              <img className="bannerurl" src={data.imageUrl} alt="Girl in a jacket" />

                                            </TableCell>
                                            <TableCell align="center" style={{ width: 100 }}>
                                              {data.type}
                                            </TableCell>
                                            <TableCell align="center" style={{ width: 100 }}>
                                              {data.quantity}
                                            </TableCell>
                                            <TableCell align="center" style={{ width: 100 }}>
                                              {data.details}
                                            </TableCell>
                                            <TableCell align="center" style={{ width: 100 }}>
                                              {data.company}
                                            </TableCell>
                                            <TableCell align="center" style={{ width: 100 }}>
                                              {data.price}

                                            </TableCell>


                                            <TableCell align="center" style={{ width: 100 }}>
                                              <CreateIcon style={{ cursor: "pointer" }} onClick={() => this.HandleEditProductDetails(data.productId, data.name, data.bannerUrl, data.type, data.details, data.company, data.price,data.quantity)} />

                                              <DeleteIcon style={{ cursor: "pointer" }} onClick={() => this.handledeleteAdminProduct(data.productId)} />

                                            </TableCell>

                                          </>
                                          {/* ) : ( */}
                                          <></>
                                          {/* )} */}
                                        </TableRow>
                                      );
                                    })
                                    : null}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </div>
                        </>
                        :
                        <>
                          <div className="plusContent">
                            <div className="plusContent_sub">
                              <div className="sportstitlePlus">Product Details</div>
                              <div>
                                <form className="form">

                                  <TextField
                                    className="TextField1"
                                    name="ProdtName"
                                    label="Product Name"
                                    variant="outlined"
                                    size="small"
                                    style={{ margin: 20 }}
                                    error={ProdtNameFlag}
                                    value={ProdtName}
                                    onChange={(e) => this.handleInputChangeProductSell(e)}
                                  />
                                  <TextField
                                    type="number"
                                    className="TextField1"
                                    name="ProductPrice"
                                    label="Product Price"
                                    variant="outlined"
                                    size="small"
                                    style={{ margin: 20 }}
                                    error={ProductPriceFlag}
                                    value={ProductPrice}
                                    onChange={(e) => this.handleInputChangeProductSell(e)}
                                  />
                                  <TextField

                                    className="TextField1"
                                    name="productType"
                                    label="Product Type"
                                    variant="outlined"
                                    size="small"
                                    style={{ margin: 20 }}
                                    error={productTypeFlag}
                                    value={productType}
                                    onChange={(e) => this.handleInputChangeProductSell(e)}
                                  />
                                  <TextField
                                    type="number"
                                    className="TextField1"
                                    name="ProdQuanity"
                                    label="Product Quantity"
                                    variant="outlined"
                                    size="small"
                                    style={{ margin: 20 }}
                                    error={ProdQuanityFlag}
                                    value={ProdQuanity}
                                    onChange={(e) => this.handleInputChangeProductSell(e)}
                                  />
                                  <TextField

                                    className="TextField1"
                                    name="ProductCompany"
                                    label="Product Company"
                                    variant="outlined"
                                    size="small"
                                    style={{ margin: 20 }}
                                    error={ProductCompanyFlag}
                                    value={ProductCompany}
                                    onChange={(e) => this.handleInputChangeProductSell(e)}
                                  />
                                  <div className="fileImage" id="filedata">
                                    <label className="imagetitle" for="myfile">Select a Image :</label>
                                    <div className="fileInput">
                                      <input className="inputFile" type="file" id="myfile" name="choosetype" onChange={(e) => this.filechangehandler(e)} />
                                      <label>{this.state.bannerImageProduct?.name}</label>
                                    </div></div>

                                  <TextField

                                    className="TextField1"
                                    name="productDetile"
                                    label="Details"
                                    variant="outlined"
                                    size="small"
                                    style={{ margin: 20 }}
                                    error={productDetilsFlag}
                                    value={productDetile}
                                    onChange={(e) => this.handleInputChangeProductSell(e)}
                                  />

                                  <div className="buttons">
                                    {this.state.buttonChange ?
                                      <button className="submitbtn1"
                                        onClick={(e) => this.handleProductOrderSubmit(e)}
                                      >Submit</button> :
                                      <button className="submitbtn1"
                                        onClick={(e) => this.handleProductOrderUpdate(e)}
                                      >Save</button>}
                                    <button className="cancelbhn">Cancel</button>
                                  </div>

                                </form>
                              </div>
                            </div>


                          </div>
                        </>
                      }


                    </>
                  }

                  {(OpenUserHome || FeedBackDetails || CustomerListManagement || (ProductListAdmin && tableDataProductListAdmin)) &&
                    <Pagination
                      className="Pagination"
                      count={this.state.TotalPages}
                      Page={this.state.PageNumber}
                      onChange={(e) => this.handlePaging(e, this.state.PageNumber)}
                      variant="outlined"
                      shape="rounded"
                      color="secondary"
                    />}
                </div>
              </div>


            </div>
            <div className="FooterDiv">Footer</div>
          </div>
        </div>


        <Backdrop
          style={{ zIndex: "1", color: "#fff" }}
          open={this.state.OpenLoader}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={state.OpenSnackBar}
          autoHideDuration={2000}
          onClose={this.handleSnackBarClose}
          message={state.Message}
          action={
            <React.Fragment>
              <Button
                color="secondary"
                size="small"
                onClick={this.handleSnackBarClose}
              >
                UNDO
              </Button>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={this.handleSnackBarClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </div>
    );
  }
}

AdminDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};



export default withStyles(styles)(AdminDashboard);
