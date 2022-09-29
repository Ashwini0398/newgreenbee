import React, { Component } from "react";

import "./CustomerDashboard.css";
// import "../Product/GetUserMenus.css"
import Modal from "@material-ui/core/Modal";
// import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment from 'moment';
import DeleteIcon from "@material-ui/icons/Delete";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import InputBase from "@material-ui/core/InputBase";
import AuthServices from "../../configurations/AuthServices";
import Pagination from "@material-ui/lab/Pagination";


const authServices = new AuthServices();
const minDate = new Date(Date.now());
// const customerServices = new CustomerServices();

export default class CustomerDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //
      CardDetails: "",
      CardDetailsFlag: false,
      PasswordFlag: false,
      Password: "",
      OpenFeedback: false,
      SaveOrderId: 0,
      Message: "",
      NumberOfRecordPerPage: 6,
      PageNumber: 1,
      TotalPages: 0,
      TotalRecords: 0,
      OpenLoader: false,
      OpenSnackBar: false,
      ProductListFlag: true,
      SeedDetailsFlag: false,
      RequestGoodsFlag: false,
      MyOrder: false,
      ProductOrderBuy: true,
      ProductList: [],
      ProdtNameFlag: false,
      ProductPriceFlag: false,
      QuantityFlag: false,
      ProdtName: "",
      ProductPrice: "",
      Quantity: "",
      ProductType: "",
      ProductTypeFlag: false,
      Feedback: "",
      FeedBackPage: false,
      PaymentModeSelect: "",
      FeedbackFlag: false,
      FeedBack: "",
      orderId: "",
      OpenCard: false,
      SaveSeedId: 0,
      AllMyOrderList: [],
      requestedGoodsDetails: [],
      FeedBackDetails: [],
      AddressCustomer: "",
      QuantityFlag: false,
      PinCode: "",
      PinCodeFlag: false,
      AboutUsPage: false,
      ContactUsPage: false,
      QuantityProduct:"",
      QuantityProductFlag:false
    };
  }

  componentWillMount() {
    this.GetallProductList(this.state.PageNumber)

  }
  handleChangePassword = (e) => {
    if (e.target.name === "Password") {
      this.setState({
        Password: e.target.value,
        PasswordFlag: false
      })
    }
  }

  checkvalidationpassword = () => {
    if (this.state.Password === "") {
      this.setState({

        PasswordFlag: true
      })
    }
  }

  handleSubmitProfileDetials = (e) => {
    e.preventDefault()
    let CustomerId = localStorage.getItem("CustomerId")
    this.checkvalidationpassword()
    if (this.state.Password !== "") {
      let data = {
        "userId": parseInt(CustomerId),
        "firstName": localStorage.getItem("firstName"),
        "lastName": localStorage.getItem("lastName"),
        "mobileNumber": localStorage.getItem("Mobileno"),
        "password": this.state.Password
      }
      authServices
        .EditProfileDetails(data)
        .then((data) => {
          console.log("GetUserAppointments Data : ", data);
          // debugger
          if (data.data.data !== null) {

            this.setState({
              Password: "",
              OpenSnackBar: true,
              Message: data.data.message,
              OpenLoader: false,
            });
          }
        })
        .catch((error) => {
          console.log("GetUserAppointments Error : ", error);
          this.setState({ OpenLoader: false });
        });
    }
  }


  handleChangesFeedback = (e) => {
    this.setState({
      Feedback: e.target.value
    })
  }





  GetallProductList = (CurrentPage) => {
    let UserId = localStorage.getItem("UserId")
    let data = {
      "page": CurrentPage,
      "size": 15
    }
    authServices
      .AllCustomerListUser(data)
      .then((data) => {
        console.log("GetUserAppointments Data : ", data);
        // debugger
        if (data.data.data !== null) {

          this.setState({
            ProductList: data.data.data.content,

            OpenLoader: false,
          });
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
  }



  ////////////////////////////////////////////////////


  handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ OpenSnackBar: false });
  };

  handlePaging = async (e, value) => {
    const { ProductListFlag, MyOrder, FeedBackPage, FeedbackFlag } = this.state
    console.log("Current Page : ", value);

    this.setState({
      PageNumber: value,
    });

    if (ProductListFlag) {
      await this.GetallProductList(value);
    }
    if (MyOrder) {
      await this.GetAllMyOrderList(value);
    }

    if (FeedBackPage) {
      await this.GetallFeedbackUser(value)
    }
  };


  SignOut = async () => {
    await localStorage.removeItem("token");
    localStorage.clear()
    this.props.history.push("/SignIn");
  };

  handledeleteCustomerProduct = (id) => {
    debugger

    authServices
      .deleteadminorderlist(id)
      .then((data) => {
        console.log("filedata : ", data);
        debugger
        if (data.data.success) {

          this.setState({
            OpenLoader: false,
            OpenSnackBar: true,
            Message: data.data.message
          });
          this.GetAllMyOrderList(this.state.PageNumber)
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
  }

  handleProductDetete = (id) => {
    authServices

      .deleteFarmerOrder(id)
      .then((data) => {
        console.log("filedata : ", data);
        debugger
        if (data.data !== null) {

          this.setState({
            OpenLoader: false,
            OpenSnackBar: true,
            Message: data.data.message
          });
          this.GetAllFarmerData(this.state.PageNumber)
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
  }



  //////////////////////////////////////////




  handleProductDetailsFlag = () => {
    this.setState({
      ProductListFlag: true,
      FeedBackPage: false,
      MyOrder: false,
      RequestGoodsFlag: false,
      ContactUsPage: false,
      AboutUsPage: false
      // OpenCard: false,
    });
    this.GetallProductList(this.state.PageNumber)
  }

  handleMyOrder = () => {
    this.setState({
      ProductListFlag: false,
      SeedDetailsFlag: false,
      MyOrder: true,
      FeedBackPage: false,
      OpenCard: false,
      RequestGoodsFlag: false,
      ContactUsPage: false,
      AboutUsPage: false
    });
    this.GetAllMyOrderList(this.state.PageNumber)
  }

  handleFeedback = () => {
    this.setState({
      ProductListFlag: false,
      SeedDetailsFlag: false,
      MyOrder: false,
      FeedBackPage: true,
      RequestGoodsFlag: false,
      ContactUsPage: false,
      AboutUsPage: false

    });
    this.GetallFeedbackUser(this.state.PageNumber)
  }

  handleAboutUs = () => {
    this.setState({
      ProductListFlag: false,
      SeedDetailsFlag: false,
      MyOrder: false,
      FeedBackPage: false,
      RequestGoodsFlag: false,
      ContactUsPage: false,
      AboutUsPage: true

    });
    this.GetallFeedbackUser(this.state.PageNumber)
  }

  handleContactUs = () => {
    this.setState({
      ProductListFlag: false,
      SeedDetailsFlag: false,
      MyOrder: false,
      FeedBackPage: false,
      RequestGoodsFlag: false,
      ContactUsPage: true,
      AboutUsPage: false
    });
    this.GetallFeedbackUser(this.state.PageNumber)
  }


  handleRequestgoodsFlag = () => {
    this.setState({
      ProductListFlag: false,
      ProductSellFlag: false,
      SeedDetailsFlag: false,
      MyOrder: false,
      RequestGoodsFlag: true
    })
    this.getAllExporterDetails(this.state.PageNumber)
  }
  ////////////////////////////////////////////////////






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
    if (e.target.name === "Quantity") {
      this.setState({
        Quantity: e.target.value,
        QuantityFlag: false
      })
    }



    this.setState({
      [e.target.name]: e.target.value
    }, () => console.log("e.target.name", e.target.value))

  }
  //////////////////////////////////////////////////////////////



  CheckValidationProductSell = () => {
    const { ProdtName, ProductPrice, Quantity, Unit, MfgDate, ExpDate, ProductType, VehicalNeed, VehicalName, QuantityVehicle, PriceVehicle, NoOfDays } = this.state
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
    if (Quantity === "") {
      this.setState({
        QuantityFlag: true
      })
    }
    if (Unit === "") {
      this.setState({
        UnitFlag: true
      })
    }
    if (MfgDate === "") {
      this.setState({
        MfgDateFlag: true
      })
    }
    if (ExpDate === "") {
      this.setState({
        ExpDateFlag: true
      })
    }

  }



  ///////////////////////////////////////////////////////////////////

  handleInputBuyProduct = (e) => {
    if (e.target.name === "AddressCustomer") {
      this.setState({
        AddressCustomer: e.target.value,
        AddressCustomerFlag: false
      })
    }
    if (e.target.name === "PinCode") {
      this.setState({
        PinCode: e.target.value,
        PinCodeFlag: false
      })
    }
    if (e.target.name === "QuantityProduct") {
      this.setState({
        QuantityProduct: e.target.value,
        QuantityProductFlag: false
      })
    }

    if (this.state.PaymentModeSelect !== "") {
      if (e.target.name === "CardDetails") {
        this.setState({
          CardDetails: e.target.value,
          CardDetailsFlag: false
        })
      }
    }

    this.setState({
      [e.target.name]: e.target.value
    }, () => console.log("e.target.name", e.target.value))

  }


  handleProductDetailsOrder = (id, price) => {
    this.setState({
      ProductOrderBuy: false,
      SaveSeedId: id,

    })
  }

  CheckValidationProductBuySeed = () => {
    const { AddressCustomer, PinCode, PaymentModeSelect, CardDetails, QuantityProduct, PriceVehicle, NoOfDays, BordingPoint, DroppingPoint } = this.state
    console.log("CheckValidation Calling...");

    if (AddressCustomer === "") {
      this.setState({
        AddressCustomerFlag: true
      })
    }
    if (PinCode === "") {
      this.setState({
        PinCodeFlag: true
      })
    }
    if (QuantityProduct === "") {
      this.setState({
        QuantityProductFlag: true
      })
    }
    
    if (PaymentModeSelect === "") {
      document.getElementById("PaymentModeSelect").classList.add('validation')
    }
    if (PaymentModeSelect !== "") {
      if (CardDetails === "") {
        this.setState({
          CardDetailsFlag: true
        })
      }

    }

  }

  handleIProductBuySubmit = (e) => {
    e.preventDefault();
    debugger
    let CustomerId = localStorage.getItem("CustomerId")
    this.CheckValidationProductBuySeed()
    if (this.state.AddressCustomer !== "" && this.state.PinCode !== "" && this.state.PaymentModeSelect !== "" &&this.state.QuantityProduct !=="") {
      let data = {

        "userId": parseInt(CustomerId),
        "productId": this.state.SaveSeedId,
        "paymentDetails": {
          "paymentMode": this.state.PaymentModeSelect,
          "paymentInfo": this.state.CardDetails
        },
        "address": this.state.AddressCustomer,
        "pinCode": this.state.PinCode,
        "quantity":parseInt(this.state.QuantityProduct)
      }
      this.setState({ OpenLoader: true })
      authServices
        .PlaceOrder(data)
        .then((data) => {

          this.setState({
            ProductOrderBuy: true,
            AddressCustomer: "",
            PinCode: "",
            QuantityProduct:"",
            PaymentModeSelect:"",
            OpenLoader: false,
            OpenSnackBar: true,
            Message: data.data.message,
            orderId: data.data.data.id
          })
          this.GetallProductList(this.state.PageNumber)
        })
        .catch((error) => {
          console.log("GetUserAppointments Error : ", error);
          this.setState({ OpenLoader: false });
        });
    }

  }

  handleInputChangePayment = (e) => {
    if (e.target.name == "PaymentModeSelect") {
      document.getElementById("PaymentModeSelect").classList.remove('validation')
    }
    this.setState({
      [e.target.name]: e.target.value
    }, () => console.log("e.target.namepayment", e.target.value))
  }

  handleSubmitDetailsPaymentDetails = (e) => {
    if (this.state.PaymentModeSelect !== "")
      this.setState({
        OpenSnackBar: true,
        Message: "Payment Successful"
      })

  }

  //////////////////////////////////////////////////////////////////////

  GetAllMyOrderList = (CurrentPage) => {
    let CustomerId = localStorage.getItem("CustomerId")
    let data = {
      "userId": parseInt(CustomerId),
      "page": CurrentPage,
      "size": 15
    }
    authServices
      .AllOrdersCustomer(data)
      .then((data) => {
        console.log("GetUserAppointments Data : ", data);
        // debugger
        if (data.data.data !== null) {

          this.setState({
            AllMyOrderList: data.data.data.content,

            OpenLoader: false,
          });
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
  }




  handleOpenFeedbackModel = (id, mobile) => {
    this.setState({
      OpenFeedback: true,
      SaveOrderId: id,

    });
  };

  InsertFeedback = () => {
    let CustomerId = localStorage.getItem("CustomerId")
    let data = {
      "productId": parseInt(this.state.SaveOrderId),
      "userId": parseInt(CustomerId),
      "feedback": this.state.Feedback
    }
    authServices
      .InsertFeedbackcustomer(data)
      .then((data) => {
        console.log("GetUserAppointments Data : ", data);
        // debugger
        if (data.data !== null) {

          this.setState({
            Feedback: "",
            OpenFeedback: false,
            OpenSnackBar: true,
            Message: data.data.message,
            OpenLoader: false,

          });
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });

  }

  handledeleteFeedbackCustomer = (id) => {
    authServices
      .DeleteFeedbackCustomer(id)
      .then((data) => {
        console.log("filedata : ", data);
        debugger
        if (data.data !== null) {

          this.setState({
            OpenLoader: false,
            OpenSnackBar: true,
            Message: data.data.message
          });
          this.GetallFeedbackUser(this.state.PageNumber)
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
  }

  GetallFeedbackUser = (CurrentPage) => {
    let CustomerId = localStorage.getItem("CustomerId")
    let data = {
      "userId": parseInt(CustomerId),
      "page": CurrentPage,
      "size": 15
    }
    authServices
      .GetallFeedbackUser(data)
      .then((data) => {
        console.log("GetUserAppointments Data : ", data);
        this.setState({
          FeedBackDetails: data.data.data.content
        })

      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
  }





  handleClose = () => {
    this.setState({ OpenFeedback: false });
  };

  disablePrevDates = (date) => {
    return date?.getDay() === 0;
  }




  render() {
    const { CardDetails, CardDetailsFlag, AddressCustomerFlag, AddressCustomer, PinCodeFlag, PinCode,QuantityProduct,QuantityProductFlag,
      ProductOrderBuy, CardNumber, CardNumberFlag, CVVDetailsFlag, CVVDetails, ExpiryDateCardFlag, requestedGoodsDetails, ExpiryDateCard, ProductList, AllMyOrderList,
      UnitFlag, MfgDate, MfgDateFlag, ProductListFlag, ExpDate, ExpDateFlag, BordingPoint, BordingPointFlag, DroppingPoint, DroppingPointFlag,
      OpenSnackBar, Message, SeedDetailsFlag, MyOrder, FeedBackDetails,
      NoOfDays, NoOfDaysFlag, TotalPrice, PriceVehicle, PriceVehicleFlag, FeedbackFlag, AboutUsPage, ContactUsPage, Feedback, FeedBackPage, PaymentModeSelect } = this.state
    return (
      <div className="UserDashBoard-Container">
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
                    fontSize: "23px",
                    fontWeight: "bold"
                  }}
                >
                  GreenBee (Customer)

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
                  <h4>{localStorage.getItem("firstName")}</h4>
                </div>
              </Toolbar>
            </AppBar>
          </div>
          <div className="Body">
            <div className="Sub-Body">
              <div className="SubBody11">

                <div
                  className={ProductListFlag ? "NavButton1" : "NavButton2"}
                  onClick={() => {
                    this.handleProductDetailsFlag();
                  }}
                >
                  <div className="NavButtonText">Product Detials </div>
                </div>




                <div
                  className={MyOrder ? "NavButton1" : "NavButton2"}
                  onClick={() => {
                    this.handleMyOrder();
                  }}
                >
                  <div className="NavButtonText">My Orders</div>
                </div>

                <div
                  className={FeedBackPage ? "NavButton1" : "NavButton2"}
                  onClick={() => {
                    this.handleFeedback();
                  }}
                >
                  <div className="NavButtonText">FeedBack</div>

                </div>
                <div
                  className={ContactUsPage ? "NavButton1" : "NavButton2"}
                  onClick={() => {
                    this.handleContactUs();
                  }}
                >
                  <div className="NavButtonText">Profile</div>
                </div>
                <div
                  className={AboutUsPage ? "NavButton1" : "NavButton2"}
                  onClick={() => {
                    this.handleAboutUs();
                  }}
                >
                  <div className="NavButtonText">About Us</div>
                </div>

              </div>
              <div className="SubBody22">
                <div className="bodyContent" >
                  {ProductListFlag &&
                    <>
                      {ProductOrderBuy ?
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
                                      style={{ width: 115, fontWeight: 600, fontSize: 15 }}
                                    >
                                      Product Name
                                    </TableCell>
                                    <TableCell
                                      align="Left"
                                      style={{ width: 115, fontWeight: 600, fontSize: 15 }}
                                    >
                                      Product Image
                                    </TableCell>
                                    <TableCell
                                      align="Left"
                                      style={{ width: 115, fontWeight: 600, fontSize: 15 }}
                                    >
                                      Product Quantity(kg)
                                    </TableCell>
                                    <TableCell
                                      align="Left"
                                      style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                    >
                                      Product Price
                                    </TableCell>

                                    <TableCell
                                      align="Left"
                                      style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                    >
                                      Product Details
                                    </TableCell>
                                    <TableCell
                                      align="Left"
                                      style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                    >
                                      Product Company
                                    </TableCell>
                                    <TableCell
                                      align="Left"
                                      style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                    >
                                      Product type
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
                                {ProductList?.length > 0
                                  ? ProductList.map((data, index) => {
                                    return (
                                      <TableRow >
                                        <>
                                          <TableCell align="Left" style={{ width: 200 }}>
                                            {data.productId}
                                          </TableCell>
                                          <TableCell align="Left" style={{ width: 200 }}>
                                            {data.name}
                                          </TableCell>
                                          <TableCell align="Left" style={{ width: 100 }}>
                                            <img className="bannerurl" src={data.imageUrl} alt="Girl in a jacket" />
                                          </TableCell>
                                          <TableCell align="Left" style={{ width: 100 }}>
                                            {data.quantity}
                                          </TableCell>
                                          <TableCell align="Left" style={{ width: 100 }}>
                                            {data.price}
                                          </TableCell>
                                          <TableCell align="Left" style={{ width: 100 }}>
                                            {data.details}

                                          </TableCell>
                                          <TableCell align="Left" style={{ width: 100 }}>
                                            {data.company}

                                          </TableCell>
                                          <TableCell align="Left" style={{ width: 100 }}>
                                            {data.type}
                                          </TableCell>

                                          <TableCell align="Left" style={{ width: 100 }}>
                                            <div className="icons">
                                              <Button className="submitbtn1" size="small" onClick={() => this.handleProductDetailsOrder(data.productId, data.price)}>Order</Button>
                                              {/* <CreateIcon style={{ cursor: "pointer" }} onClick={()=>this.handleEditTiffin(data.id,data.planName,data.bannerUrl,data.pricePerDay,data.description)} /> */}
                                            </div>

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
                        </div> :


                        <div className="plusContent">
                          <div className="plusContent_sub">
                            <div className="sportstitlePlus">Buyer Details</div>
                            <div>
                              <form className="form">
                                <TextField

                                  className="TextField1"
                                  name="Customer Name"
                                  label="Customer Name"
                                  variant="outlined"
                                  size="small"
                                  style={{ margin: 20 }}
                                  value={localStorage.getItem("firstName")}

                                />
                                <TextField

                                  className="TextField1"

                                  label="Email"
                                  variant="outlined"
                                  size="small"
                                  style={{ margin: 20 }}
                                  value={localStorage.getItem("email")}

                                />

                                <TextField

                                  className="TextField1"
                                  name="AddressCustomer"
                                  label="Address"
                                  variant="outlined"
                                  size="small"
                                  style={{ margin: 20 }}
                                  error={AddressCustomerFlag}
                                  value={AddressCustomer}
                                  onChange={(e) => this.handleInputBuyProduct(e)}
                                />
                                <TextField

                                  className="TextField1"
                                  name="PinCode"
                                  label="PinCode"
                                  variant="outlined"
                                  size="small"
                                  style={{ margin: 20 }}
                                  error={PinCodeFlag}
                                  value={PinCode}
                                  onChange={(e) => this.handleInputBuyProduct(e)}
                                />
                                <TextField

                                  className="TextField1"
                                  name="QuantityProduct"
                                  label="Quantity"
                                  variant="outlined"
                                  size="small"
                                  style={{ margin: 20 }}
                                  error={QuantityProductFlag}
                                  value={QuantityProduct}
                                  onChange={(e) => this.handleInputBuyProduct(e)}
                                />

                                <select className="TextField2"
                                  name="PaymentModeSelect"
                                  variant="outlined"
                                  size="small"
                                  id="PaymentModeSelect"
                                  style={{ margin: 20 }}
                                  // error={SportNameFlag}
                                  value={PaymentModeSelect}
                                  onChange={(e) => this.handleInputChangePayment(e)}
                                >

                                  <option value="" disabled selected >Select Payment Mode</option>
                                  <option value="Debit"  >Debit</option>
                                  <option value="Credit"  >Credit</option>
                                  <option value="UPI"  >UPI</option>
                                  <option value="COD"  >COD</option>

                                </select>

                                <div>
                                  {(PaymentModeSelect === "Debit" || PaymentModeSelect === "Credit" || PaymentModeSelect === "UPI") &&
                                    <TextField

                                      className="TextField1"
                                      name="CardDetails"
                                      label={(PaymentModeSelect === "Debit" || PaymentModeSelect === "Credit") ? "Enter card number" : "Enter Upi id"}
                                      variant="outlined"
                                      size="small"
                                      style={{ margin: 20 }}
                                      error={CardDetailsFlag}
                                      value={CardDetails}
                                      onChange={(e) => this.handleInputBuyProduct(e)}
                                    />}


                                </div>




                                <div className="buttons">
                                  <button className="submitbtn1"
                                    onClick={(e) => this.handleIProductBuySubmit(e)}
                                  >Submit</button>
                                  <button className="cancelbhn">Cancel</button>
                                </div>

                              </form>
                            </div>
                          </div>


                        </div>

                      }
                    </>
                  }
                  {MyOrder &&
                    <>


                      <div className="GetUserMenus-SubContainer mt-3">
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
                                    Quantity(kg)
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
                              {AllMyOrderList.length > 0
                                ? AllMyOrderList.map((data, index) => {
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
                                          <div className="divBtn">
                                            {/* {data.bookedBy.email}123 */}
                                            <Button
                                              variant="outlined"
                                              className="submitbtn1"
                                              onClick={() => {
                                                this.handleOpenFeedbackModel(data.product.productId, data.user.mobileNumber);
                                              }}
                                            >
                                              Feedback
                                            </Button>
                                            <Button
                                              variant="outlined"
                                              className=" cancelbhn"
                                              onClick={() => this.handledeleteCustomerProduct(data.orderId)}
                                            >
                                              Cancel
                                            </Button>
                                          </div>




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

                      <Modal
                        open={this.state.OpenFeedback}
                        onClose={this.handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                          timeout: 500,
                        }}
                        className="Model-Create-Feedback"
                      >
                        <Fade in={this.state.OpenFeedback}>
                          <div className="Model-Create-Feedback-Main">
                            <div className="Model-Create-Feedback-Header">
                              {/* <div className="Model-Create-Feedback-Header-Text"> */}
                              Send Your Feedback
                              {/* </div> */}
                            </div>
                            <div className="Model-Create-Feedback-Body">
                              <TextField
                                id="outlined-basic"
                                label="Feedback"
                                name="Feedback"
                                variant="outlined"
                                style={{ width: "100%" }}
                                multiline
                                rows={10}
                                size="small"
                                error={FeedbackFlag}
                                value={Feedback}
                                onChange={(e) => this.handleChangesFeedback(e)}
                              />
                            </div>
                            <div className="Model-Create-Feedback-Footer">
                              <Button
                                variant="contained"
                                style={{ margin: "10px" }}
                                onClick={() => {
                                  this.handleClose();
                                }}
                              >
                                Cancel
                              </Button>
                              <Button
                                variant="contained"
                                // color="primary"
                                className="submitbtn1"
                                onClick={() => {
                                  this.InsertFeedback();
                                }}
                              >
                                Send
                              </Button>
                            </div>
                          </div>
                        </Fade>
                      </Modal>


                    </>
                  }
                  {FeedBackPage &&
                    <>
                      <div className="GetUserMenus-SubContainerAdmin">
                        <TableContainer component={Paper}>
                          <Table className="tableDeliveryboy" aria-label="simple table">

                            <>
                              <TableHead></TableHead>
                              <TableHead>
                                <TableRow>
                                  <TableCell
                                    align="Center"
                                    style={{ width: 50, fontWeight: 600, fontSize: 15 }}
                                  >
                                    Id
                                  </TableCell>
                                  <TableCell
                                    align="Center"
                                    style={{ width: 115, fontWeight: 600, fontSize: 15 }}
                                  >
                                    User Name
                                  </TableCell>
                                  <TableCell
                                    align="Center"
                                    style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                  >
                                    Email Id
                                  </TableCell>
                                  <TableCell
                                    align="Center"
                                    style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                  >
                                    Feedback
                                  </TableCell>
                                  <TableCell
                                    align="Center"
                                    style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                  >
                                    Action
                                  </TableCell>


                                </TableRow>
                              </TableHead>
                            </>

                            <TableBody>
                              {FeedBackDetails?.length > 0
                                ? FeedBackDetails.map((data, index) => {
                                  return (
                                    <TableRow >

                                      <>
                                        <TableCell align="Center" style={{ width: 200 }}>
                                          {data.feedbackId}
                                        </TableCell>
                                        <TableCell align="Center" style={{ width: 200 }}>
                                          {data.user.firstName}
                                        </TableCell>
                                        <TableCell align="Center" style={{ width: 100 }}>
                                          {data.user.email}
                                        </TableCell>

                                        <TableCell align="Center" style={{ width: 100 }}>
                                          {data.feedback}
                                        </TableCell>
                                        <TableCell align="Center" style={{ width: 100 }}>
                                          <DeleteIcon style={{ cursor: "pointer" }} onClick={() => this.handledeleteFeedbackCustomer(data.feedbackId)} />
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
                    </>}
                  {AboutUsPage &&
                    <>
                      <div className="AboutUsPage">
                        An e-commerce website is one that allows people to buy and sell physical goods, services, and digital products over the internet rather than at a brick-and-mortar location. Through an e-commerce website, a business can process orders, accept payments, manage shipping and logistics, and provide customer service.

                        It’s tough to imagine daily life without e-commerce. We order food, clothes, and furniture; we register for classes and other online services; we download books, music, and movies; and so much more. E-commerce has taken root and is here to stay.

                        The term “e-commerce” simply means the sale of goods or services on the internet. In its most basic form, e-commerce involves electronically transferring funds and data between 2 or more parties. This form of business has evolved quite a bit since its beginnings in the electronic data interchange of the 1960s and the inception of online shopping in the 1990s.

                        In recent years, e-commerce has enjoyed a massive boost from the rise of smartphones, which allow consumers to shop from nearly anywhere.

                        What is an e-co  </div>
                    </>}
                  {ContactUsPage &&
                    <>
                      <div className="plusContent">
                        <div className="plusContent_sub">
                          <div className="sportstitlePlus">Edit Profile</div>
                          <div>
                            <form className="form">
                              <TextField

                                className="TextField1"
                                name="Customer Name"
                                label="Customer FirstName"
                                variant="outlined"
                                size="small"
                                style={{ margin: 20 }}
                                value={localStorage.getItem("firstName")}

                              />
                              <TextField

                                className="TextField1"
                                name="Customer Name"
                                label="Customer LastName"
                                variant="outlined"
                                size="small"
                                style={{ margin: 20 }}
                                value={localStorage.getItem("lastName")}

                              />

                              <TextField
                                className="TextField1"
                                name="MobileNo"
                                label="MobileNo"
                                variant="outlined"
                                size="small"
                                value={localStorage.getItem("Mobileno")}

                              />

                              <TextField
                                className="TextField1"
                                type="password"
                                name="Password"
                                label="Password"
                                variant="outlined"
                                size="small"
                                style={{ margin: 10 }}
                                error={this.state.PasswordFlag}
                                value={this.state.Password}
                                onChange={this.handleChangePassword}
                              />






                              <div className="buttons">
                                <button className="submitbtn1"
                                  onClick={(e) => this.handleSubmitProfileDetials(e)}
                                >Submit</button>
                                <button className="cancelbhn">Cancel</button>
                              </div>

                            </form>
                          </div>
                        </div>


                      </div>

                    </>}

                  {(MyOrder || ProductListFlag || FeedBackPage) &&
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
          </div>

          <div className="FooterDiv">Footer</div>
        </div>
        <Backdrop
          style={{ zIndex: "1", color: "#fff" }}
          open={this.state.OpenLoader}
          onClick={() => {
            this.setState({ OpenLoader: false });
          }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={OpenSnackBar}
          autoHideDuration={2000}
          onClose={this.handleSnackBarClose}
          message={Message}
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
