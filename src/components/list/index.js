import { View } from 'react-native';
import { ListItemDivider, ListItemWrapper, ListItemTitle } from './style';

export const ListItem = props => (
  <View>
    {props.divider && <ListItemDivider />}
    <ListItemWrapper onPress={props.onPress}>
      <ListItemTitle>{props.title}</ListItemTitle>
    </ListItemWrapper>
  </View>
);
