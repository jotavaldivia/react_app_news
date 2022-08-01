 const getAllNews = async (state,setLoading) => {
    try {
      const response = await fetch("http://hn.algolia.com/api/v1/search");
      const data = await response.json();
      await state(data.hits)
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };


  export  {
    getAllNews
  }