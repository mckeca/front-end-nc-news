import React, { Component } from 'react';

class SortForm extends Component {
  state = { hideForm: true, sort_by: 'created_at', order: 'desc' };

  render() {
    const { hideForm } = this.state;
    return hideForm ? (
      <button onClick={this.toggleForm}>Sort</button>
    ) : (
      <section>
        <button onClick={this.toggleForm}>X</button>
        <form onSubmit={this.handleSubmit}>
          <p>Sort By:</p>
          <button
            type="button"
            onClick={this.handleClick}
            name="sort_by"
            id="votes"
          >
            Popularity
          </button>
          <button
            type="button"
            onClick={this.handleClick}
            name="sort_by"
            id="created_at"
          >
            Date
          </button>
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
    event.preventDefault();
    this.props.sortList(this.state.sort_by, this.state.order);
  };
}

export default SortForm;
