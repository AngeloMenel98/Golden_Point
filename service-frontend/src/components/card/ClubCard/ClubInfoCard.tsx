import styled from "styled-components";
import Card from "../Card";
import { ClubDTO } from "../../../entities/dtos/ClubDTO";
import { darkGreen, lightGray, pastelGreen } from "../../../utils/colors";
import { formatDateTime } from "../../../utils/transformDate";
import CalFromIcon from "../../../icons/CalendarsIcon/CalendarFromIcon";
import CalToIcon from "../../../icons/CalendarsIcon/CalendarToIcon";

// Estilos para las columnas
const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.1rem;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;

const TitleContainer = styled.div`
  display: flex; // Cambiado a flex para alinear elementos en fila
  justify-content: space-between;
  align-items: center; // Alinear verticalmente los elementos
  margin-bottom: 0.5rem; // Espacio entre el título y el resto
`;

export const CardTitle = styled.h3`
  color: ${darkGreen};
  font-weight: 900;
  margin: 0;
  font-size: 1.5rem;
`;

export const AddressContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DateContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  padding-right: 0.5rem;
`;

export const CardText = styled.p`
  color: ${darkGreen};
  margin: 4px 0;
  font-weight: 600;
  text-align: center;
`;

export const AddressSpan = styled.span`
  color: ${darkGreen};
  font-weight: 450;
  text-align: center;
`;

interface ClubCardProps {
  clubsData: ClubDTO[];
}

const ClubInfo: React.FC<ClubCardProps> = ({ clubsData }) => {
  return (
    <>
      {clubsData.map((cl, index) => (
        <Card
          key={index}
          backgroundCol={lightGray}
          borderCol={darkGreen}
          boxCol={pastelGreen}
          mWidth={400}
          mHeight={400}
        >
          <TitleContainer>
            <CardTitle>{cl.ClubName}</CardTitle>
            <AddressSpan>
              <strong>Canchas: </strong>
              {cl.CourtCount}
            </AddressSpan>
          </TitleContainer>
          <FlexContainer>
            <Column>
              <AddressContainer>
                <CardText>Dirección:</CardText>
                <AddressSpan>{cl.Address}</AddressSpan>
              </AddressContainer>
            </Column>
            <Column>
              <DateContainer>
                <IconContainer>
                  <CalFromIcon color={darkGreen} width={35} height={45} />
                </IconContainer>
                <CardText>{formatDateTime(cl.AvFrom)}</CardText>
              </DateContainer>
              <DateContainer>
                <IconContainer>
                  <CalToIcon color={darkGreen} width={35} height={45} />
                </IconContainer>
                <CardText>{formatDateTime(cl.AvTo)}</CardText>
              </DateContainer>
            </Column>
          </FlexContainer>
        </Card>
      ))}
    </>
  );
};

export default ClubInfo;
