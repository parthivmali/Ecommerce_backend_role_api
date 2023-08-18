const ApiFeatures = {
    search: (query, queryStr) => {
        const keyword = queryStr.keyword ? {
            prod_name: {
                $regex: queryStr.keyword,
                $options: 'i'
            },
        } : {};
        query = query.find({ ...keyword });
        return query;
    },

    filter: (query, queryStr) => {
        const queryCopy = { ...queryStr };
        
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach((key) => delete queryCopy[key]);

        let queryString = JSON.stringify(queryCopy);
        queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

        query = query.find(JSON.parse(queryString));

        return query;
    },

    pagination: (query, queryStr, resultPerPage) => {
        const currentPage = Number(queryStr.page) || 1;
        const skip = resultPerPage * (currentPage - 1);
        query = query.limit(resultPerPage).skip(skip);
        return query;
    }
};

module.exports = ApiFeatures;
