class APIFeatures {
	constructor(query, queryString) {
		this.queryy = query;
		this.queryString = queryString;
		// console.log(this.queryString);
	} // mongoose query "Tour" and express querystring from routes...


	filter() {
		const queryObj = { ...this.queryString }; // This Takeout all the keyvalue pair of document and {} this assign keyvalue to new object.

		const excludeFields = ['page', 'sort', 'limit', 'fields', 'specefic']; // Deleting all the extra fields except keyvalue pair
		excludeFields.forEach((el) => delete queryObj[el]);

		this.queryy = this.queryy.find(queryObj);

		return this; // this here refers to Class name.........

	}

	sort() {
		if (this.queryString.sort) {
			const sortBy = this.queryString.sort.split(',').join(' ');
			// console.log(sortBy);
			this.queryy = this.queryy.sort(sortBy)
		}
		return this;
	}

	limitFields() {
		if (this.queryString.fields) {
			const sortBy = this.queryString.fields.split(',').join(' ');
			this.queryy = this.queryy.select(sortBy);
		}
		else {
			this.queryy = this.queryy.select('-__v -createdAt');
		}
		return this;
	}

	limits() {
		if (this.queryString.limit) {
			const limit_data = this.queryString.limit * 1 || 100;
			this.queryy = this.queryy.limit(limit_data);
		}
		return this;
	}

}

module.exports = APIFeatures;