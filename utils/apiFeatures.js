class APIFeatures {
  /**
   *
   * @param {Model} model - Mongoose Model Object passed
   * @param {Object} queryObj - req.query object passed by Express
   * @param {String} categoryType - Type of the category that define the model - Ex: 'technology', 'great work', 'wonder'
   * @constructor
   */
  constructor(model, queryObj, categoryType = null) {
    this.model = model;

    // FILTER: sort, page, fields, limit.
    // Renamed the variables from object destructering to "this.<nomVar>"
    ({
      page: this.page,
      sort: this.sortProp, // not this.sort --> this.sort != this.sort()
      fields: this.fields,
      limit: this.limit,
      ...this.queryObj
    } = queryObj);

    if (categoryType)
      Object.assign(this.queryObj, { "category.type": categoryType });

    this.query = this.model.find(this.queryObj); // Model.find(...) without "await" isn't executed

    return this;
  }

  sort() {
    if (this.sortProp) {
      const sortBy = this.sortProp.split(",").join(" ");
      this.query = this.query.sort(sortBy); // .sort(<Object>) === .sort('<field> <field>')
    }

    return this;
  }

  limitFields() {
    if (this.fields) {
      const fieldsBy = this.fields.split(",").join(" ");
      this.query = this.query.select(fieldsBy);
    } else this.query = this.query.select("-__v"); // "-" : Show everything except "__v"

    return this;
  }

  paginate() {
    const pageNum = Number(this.page) || 1;
    const limitNum = Number(this.limit) || 200;
    const skip = (pageNum - 1) * this.limit;

    this.query = this.query.skip(skip).limit(limitNum);

    return this;
  }
}

module.exports = APIFeatures;
