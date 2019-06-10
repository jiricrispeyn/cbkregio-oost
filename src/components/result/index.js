import React from 'react';
import {
  StyledContainer,
  StyledDivider,
  StyledItem,
  StyledText,
} from './style';

const Result = ({ home, away, style }) => {
  return (
    <StyledContainer style={style}>
      <StyledItem isFirst={true} score={home}>
        <StyledText score={home}>{home}</StyledText>
      </StyledItem>
      <StyledDivider />
      <StyledItem isLast={true} score={away}>
        <StyledText score={away}>{away}</StyledText>
      </StyledItem>
    </StyledContainer>
  );
};

export default Result;
