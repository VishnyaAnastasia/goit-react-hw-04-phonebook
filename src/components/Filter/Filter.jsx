import styles from './Filter.module.css';
import PropTypes from 'prop-types';

export const Filter = ({ filterHandler }) => {
  return (
    <label>
      <input
        className={styles.inputView}
        onInput={filterHandler}
        type="text"
        name="filter"
        placeholder="Find contacts by name"
      />
    </label>
  );
};

Filter.propTypes = {
  filterHandler: PropTypes.func.isRequired,
};
