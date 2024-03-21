module.exports = {
    format_date: (date) => {
      // Format date as MM/DD/YYYY
      return date.toLocaleDateString();
    },
  
    format_amount: (amount) => {
      // format large numbers with commas
      return parseInt(amount).toLocaleString();
    },
  
    is_my_page: (pageUser, userId) => {
      return pageUser === userId;
    },
  };

  // This file will provide utility functions that can be used in Handlebars templates to perform common tasks.