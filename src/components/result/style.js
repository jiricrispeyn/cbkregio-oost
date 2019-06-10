import styled from '@emotion/native';
import colors from '../../utils/colors';

export const StyledContainer = styled.View`
  flex-direction: row;
`;

export const StyledItem = styled.View`
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: ${props =>
    props.score >= 9 ? colors.white : colors.whisper};
  border-top-left-radius: ${props => (props.isFirst ? '5px' : 0)};
  border-top-right-radius: ${props => (props.isFirst ? 0 : '5px')};
  border-bottom-left-radius: ${props => (props.isFirst ? '5px' : 0)};
  border-bottom-right-radius: ${props => (props.isFirst ? 0 : '5px')};
`;

export const StyledText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 0.3px;
  color: ${props => {
    if (props.score > 9) {
      return colors.malachite;
    }

    if (props.score < 9) {
      return colors.milanoRed;
    }

    return colors.firefly;
  }};
`;

export const StyledDivider = styled.View`
  height: 100%;
  width: 1px;
  background-color: ${colors.mystic};
`;
