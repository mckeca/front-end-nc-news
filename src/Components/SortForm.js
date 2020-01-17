import React, { Component } from 'react';

class SortForm extends Component {
  state = { hideForm: true, sort_by: 'created_at', order: 'desc' };

  render() {
    const { hideForm } = this.state;
    return hideForm ? (
      <button id="sort-btn" onClick={this.toggleForm}>
        Sort
      </button>
    ) : (
      <section>
        <button id="close-sort-btn" onClick={this.toggleForm}>
          X
        </button>
        <form id="sort-form" onSubmit={this.handleSubmit}>
          <section id="sort">
            <p>Sort By:</p>
            <button
              type="button"
              onClick={this.handleClick}
              name="sort_by"
              id="votes"
            >
              Votes
            </button>
            <button
              type="button"
              onClick={this.handleClick}
              name="sort_by"
              id="comment_count"
            >
              Comments
            </button>
            <button
              type="button"
              onClick={this.handleClick}
              name="sort_by"
              id="created_at"
            >
              Date
            </button>
          </section>
          <section id="order">
            <p>Order:</p>
            <button
              type="button"
              onClick={this.handleClick}
              name="order"
              id="asc"
            >
              Ascending
            </button>
            <button
              type="button"
              onClick={this.handleClick}
              name="order"
              id="desc"
            >
              Descending
            </button>
          </section>
          <button type="submit">Submit</button>
        </form>
      </section>
    );
  }

  toggleForm = () => {
    this.setState(currentState => {
      return { hideForm: !currentState.hideForm };
    });
  };

  handleClick = ({ target }) => {
    this.setState({ [target.name]: target.id });
  };

  handleSubmit = event => {
    const { sort_by, order } = this.state;
    const { sortList } = this.props;
    event.preventDefault();
    sortList(sort_by, order);
  };
}

export default SortForm;
