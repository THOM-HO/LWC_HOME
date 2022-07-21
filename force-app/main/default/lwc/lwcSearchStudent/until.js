function setDisablePage(isFirstPage, isPreviousPage, currentPage, isNextPage, isLastPage) {
    if(currentPage == 1){
        isFirstPage = true;
        isPreviousPage = true;
    }else{
        isFirstPage = false;
        isPreviousPage = false; 
    }
    if(currentPage == totalPage){
        isNextPage = true;
        isLastPage = true;
    }else{
        isNextPage = false;
        isLastPage = false;  
    }
  }
  
 export { setDisablePage };