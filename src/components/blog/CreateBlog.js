import React, { useState, useEffect }  from "react";
import { Link } from "react-router-dom";

const CreateBlog= () => {
    return(
        <div>
            create Blog
            <Link to="/blog">Back</Link>
        </div>
    )
}

export default CreateBlog