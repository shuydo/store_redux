// import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { useGetProductQuery } from "../../features/api/apiSlice";
import { getRelatedProducts } from "../../features/products/productsSlice";
import { ROUTES } from "../../utils/routes";
import Product from "./Product";
import Products from "./Products";

const SingleProduct = () => {
  const dispatch=useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({ id });

  // console.log(data, isLoading);
  useEffect(() => {
    if (!isFetching && !isLoading && !isSuccess) navigate(ROUTES.HOME); //redirect if wrong product id
  }, [isLoading, isFetching, isSuccess]);

  useEffect(() => {
    // console.log(data);
    if(data){
      dispatch(getRelatedProducts(data.category.id))
    }
  }, [data]);

  return !data ? (
    // <section className={styles.preloader}>Loading...</section>
    <section className="preloader">Loading...</section>
  ) : (
    <>
      <Product {...data} />
      {/* <Products products={data} amount={5} title="Trending" /> */}
    </>
  );
};

export default SingleProduct;
