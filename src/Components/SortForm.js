import React, { Component } from 'react';

class SortForm extends Component {
  state = { hideForm: true, sort_by: 'created_at', order: 'desc' };

  render() {
    const { hideForm, sort_by, order } = this.state;
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
              id="created_at"
              className={sort_by === 'created_at' ? 'selected' : 'unselected'}
            >
              Date
            </button>
            <button
              type="button"
              onClick={this.handleClick}
              name="sort_by"
              id="votes"
              className={sort_by === 'votes' ? 'selected' : 'unselected'}
            >
              Votes
            </button>
            <button
              type="button"
              onClick={this.handleClick}
              name="sort_by"
              id="comment_count"
              className={
                sort_by === 'comment_count' ? 'selected' : 'unselected'
              }
            >
              Comments
            </button>
          </section>
          <section id="order">
            <p>Order:</p>
            <button
              type="button"
              onClick={this.handleClick}
              name="order"
              id="desc"
              className={order === 'desc' ? 'selected' : 'unselected'}
            >
              Descending
            </button>
            <button
              type="button"
              onClick={this.handleClick}
              name="order"
              id="asc"
              className={order === 'asc' ? 'selected' : 'unselected'}
            >
              Ascending
            </button>
          </section>
          <button type="submit" className="unselected">
            Submit
          </button>
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
    this.setState({ hideForm: true });
  };
}

export default SortForm;
