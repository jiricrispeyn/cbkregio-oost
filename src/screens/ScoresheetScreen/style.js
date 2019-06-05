import styled from '@emotion/native';
import colors from '../../utils/colors';

export const StyledResultContainer = styled.View`
  flex-direction: row;
`;

export const StyledResultItem = styled.View`
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: ${props => (props.winner ? colors.white : colors.whisper)};
  border-top-left-radius: ${props => (props.isFirst ? '5px' : 0)};
  border-top-right-radius: ${props => (props.isLast ? '5px' : 0)};
  border-bottom-left-radius: ${props => (props.isFirst ? '5px' : 0)};
  border-bottom-right-radius: ${props => (props.isLast ? '5px' : 0)};
  border-left: ${props =>
    props.isFirst ? 'none' : `1px solid ${colors.mystic}`};
`;

export const StyledResultItemText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 0.3px;
  color: ${props => (props.winner ? colors.malachite : colors.milanoRed)};
`;
