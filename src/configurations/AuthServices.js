import AxiosServices from "./AxiosServices";
let baseURL = "http://localhost:8080/"
// import Configurations from "../configurations/Configurations";
// import Auth from "../components/Auth";
// import AdminDashboard from "../components/Dashboard/AdminDashboard";
// import UserDashboard from "../components/Dashboard/UserDashBoard";

const axiosServices = new AxiosServices();

const headers = {
  headers: {
    "accept": "*/*",
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};
const headers1 = {
  headers: {
    "accept": "*/*",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};
const UserId = localStorage.getItem('UserId')

export default class AuthServices {
  SignUp(data) {
    return axiosServices.post(baseURL + "api/auth/register", data, false);
  }

  SignIn(data) {
    return axiosServices.post(baseURL + "api/auth/login", data, false);
  }

  AddProductDetailsAdmin(data) {
    return axiosServices.post(baseURL + `api/admin/product/save`, data, true,headers);
  }

  AllAdminProductList(data) {
    return axiosServices.post(baseURL  + `api/admin/product/all`, data, true,headers);
  }

  DeleteAdminDataProduct(deleteid) {
    return axiosServices.Delete(baseURL + `api/admin/product/delete/${deleteid}`, true,headers);
  }
  AllCustomerList(data) {
    return axiosServices.post(baseURL +`api/admin/user/customers/all`,data, true,headers);
  }  
  AllAdminOrdersList(data) {
    return axiosServices.post(baseURL +`api/admin/order/all`,data, true,headers);
  }
  AllFeedbackAdminList(data) {
    return axiosServices.post(baseURL + `api/admin/feedback/all`, data, true,headers);
  }
  deleteFeedback(deleteId) {
    return axiosServices.Delete(baseURL + `api/admin/feedback/delete/${deleteId}`, true,headers);
  }
  deleteadminorderlist(deleteId) {
    return axiosServices.Delete(baseURL  + `api/admin/order/delete/${deleteId}`,true,headers1);
  }
  deleteadminCustomerlist(deleteId) {
    return axiosServices.Delete(baseURL  + `api/admin/user/delete/${deleteId}`,true,headers1);
  }
  AllCustomerListUser(data) {
    return axiosServices.post(baseURL+ `api/customer/product/all`, data, true,headers);
  }

  PlaceOrder(data) {
    return axiosServices.post(baseURL + `api/customer/order/save`, data, true,headers);
  }

  AllOrdersCustomer(data) {
    return axiosServices.post(baseURL  + `api/customer/user/my-orders`, data, true,headers);
  }

  InsertFeedbackcustomer(data) {
    return axiosServices.post(baseURL  + `api/customer/feedback/save`,data, true,headers);
  }

  GetallFeedbackUser(data) {
    return axiosServices.post(baseURL + `api/customer/user/my-feedbacks` , data,true,headers);
  }
  
  DeleteAdminData(deleteid) {
    return axiosServices.Delete(baseURL + `api/admin/delete-order/${deleteid}`, true,headers);
  }

  EditProfileDetails(data) {
    return axiosServices.Patch(baseURL  + `api/customer/user/update`, data, true,headers);
  }

  DeleteFeedbackCustomer(feedbackId) {
    return axiosServices.Delete(baseURL  + `api/customer/feedback/delete/${feedbackId}`,true,headers1);
  }


  UpdateProductDetailsAdminStatus(data) {
    return axiosServices.Put(baseURL + `api/admin/product/update`,data, true,headers);
  }

  DeleteOrderExporter(UserId) {
    return axiosServices.Delete(baseURL + `api/exporter/delete-order/${UserId}`,  true,headers);
  }
  deleteFarmerOrder(UserId) {
    return axiosServices.Delete(baseURL + `api/farmer/delete-Product/${UserId}`, true,headers);
  }

}
