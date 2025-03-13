import * as React from 'react';
import PropTypes from 'prop-types';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';

const FontAwesomeSvgIcon = React.forwardRef((props, ref) => {
  const { icon } = props;

  const {
    icon: [width, height, , , svgPathData],
  } = icon;

  return (
    <SvgIcon ref={ref} viewBox={`0 0 ${width} ${height}`}>
      {typeof svgPathData === 'string' ? (
        <path d={svgPathData} />
      ) : (

        svgPathData.map((d, i) => (
          <path style={{ opacity: i === 0 ? 0.4 : 1 }} d={d} />
        ))
      )}
    </SvgIcon>
  );
});

FontAwesomeSvgIcon.propTypes = {
  icon: PropTypes.any.isRequired,
};

export const ThreePointIcon = ({ onClick }) => {
  return (
    <Stack direction="row" spacing={2} onClick = {onClick}>
      <IconButton aria-label="Example">
        <FontAwesomeIcon icon={faEllipsisV} />
      </IconButton>
    </Stack>
  );
}
