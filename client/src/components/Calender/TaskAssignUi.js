import * as React from "react";
import Paper from "@material-ui/core/Paper";
import TableCell from "@material-ui/core/TableCell";
import {
  darken,
  fade,
  lighten
} from "@material-ui/core/styles/colorManipulator";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import classNames from "clsx";
import {
  Scheduler,
  MonthView,
  Appointments,
  Toolbar,
  DateNavigator,
  AppointmentTooltip,
  AppointmentForm,
  EditRecurrenceMenu,
} from "@devexpress/dx-react-scheduler-material-ui";
import { withStyles } from "@material-ui/core/styles";

export const APIURL = "http://localhost:5000/event";

const getBorder = theme =>
  `1px solid ${theme.palette.type === "light"
    ? lighten(fade(theme.palette.divider, 1), 0.88)
    : darken(fade(theme.palette.divider, 1), 0.68)
  }`;

const DayScaleCell = props => (
  <MonthView.DayScaleCell
    {...props}
    style={{ textAlign: "center", fontWeight: "bold" }}
  />
);

const styles = theme => ({
  cell: {
    color: "#78909C!important",
    position: "relative",
    userSelect: "none",
    verticalAlign: "top",
    padding: 0,
    height: 100,
    borderLeft: getBorder(theme),
    "&:first-child": {
      borderLeft: "none"
    },
    "&:last-child": {
      paddingRight: 0
    },
    "tr:last-child &": {
      borderBottom: "none"
    },
    "&:hover": {
      backgroundColor: "white"
    },
    "&:focus": {
      backgroundColor: fade(theme.palette.primary.main, 0.15),
      outline: 0
    }
  },
  content: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    position: "absolute",
    alignItems: "center"
  },
  text: {
    padding: "0.5em",
    textAlign: "center"
  },
  opacity: {
    opacity: "0.5"
  },
  appointment: {
    borderRadius: "10px",
    "&:hover": {
      opacity: 0.6
    }
  },
  apptContent: {
    "&>div>div": {
      whiteSpace: "normal !important",
      lineHeight: 1.2
    }
  },
  flexibleSpace: {
    flex: "none"
  },
  flexContainer: {
    display: "flex",
    alignItems: "center"
  },
  tooltipContent: {
    padding: theme.spacing(3, 1),
    paddingTop: 0,
    backgroundColor: theme.palette.background.paper,
    boxSizing: "border-box",
    width: "400px"
  },
  tooltipText: {
    ...theme.typography.body2,
    display: "inline-block"
  },
  title: {
    ...theme.typography.h6,
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightBold,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  icon: {
    color: theme.palette.action.active,
    verticalAlign: "middle"
  },
  circle: {
    width: theme.spacing(4.5),
    height: theme.spacing(4.5),
    verticalAlign: "super"
  },
  textCenter: {
    textAlign: "center"
  },
  dateAndTitle: {
    lineHeight: 1.1
  },
  titleContainer: {
    paddingBottom: theme.spacing(2)
  },
  container: {
    paddingBottom: theme.spacing(1.5)
  }
});

// #FOLD_BLOCK
const CellBase = React.memo(
  ({
    classes,
    startDate,
    formatDate,
    otherMonth
    // #FOLD_BLOCK
  }) => {
    const isFirstMonthDay = startDate.getDate() === 1;
    const formatOptions = isFirstMonthDay
      ? { day: "numeric", month: "long" }
      : { day: "numeric" };
    return (
      <TableCell
        tabIndex={0}
        className={classNames({
          [classes.cell]: true,
          [classes.opacity]: otherMonth
        })}>
        <div className={classes.text}>
          {formatDate(startDate, formatOptions)}
        </div>
      </TableCell>
    );
  }
);

const TimeTableCell = withStyles(styles, { name: "Cell" })(CellBase);

const Appointment = withStyles(styles, { name: "Appointment" })(
  ({ classes, ...restProps }) => (
    <Appointments.Appointment {...restProps} className={classes.appointment} />
  )
);

const AppointmentContent = withStyles(styles, { name: "AppointmentContent" })(
  ({ classes, ...restProps }) => (
    <Appointments.AppointmentContent
      {...restProps}
      className={classes.apptContent}
    />
  )
);

const FlexibleSpace = withStyles(styles, { name: "ToolbarRoot" })(
  ({ classes, ...restProps }) => (
    <Toolbar.FlexibleSpace {...restProps} className={classes.flexibleSpace}>
    </Toolbar.FlexibleSpace>
  )
);

export default class Demo extends React.PureComponent {

  // #FOLD_BLOCK
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      title: "",
      startDate: null,
      endDate: null,
    };
    this.commitChanges = this.commitChanges.bind(this);
  }

  async componentDidMount() {
    document.title = `Component did mount`;
    var events = await this.getEvents();
    this.setState({ data: events })
  }

  async getEvents() {
    var axios = require('axios');

    var config = {
      method: 'get',
      url: 'http://localhost:4000/event',
      headers: {}
    };

    return await axios(config)
      .then(function (response) {
        console.log(response.data);
        response.data.map(event => {
          event.id = event._id;
          event.startDate = new Date(event.startDate);
          event.endDate = new Date(event.endDate);
        });
        return response.data
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  commitChanges({ added, changed, deleted }) {
    this.setState(state => {
      let { data } = state;
      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map(appointment =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
      }
      if (deleted !== undefined) {
        data = data.filter(appointment => appointment.id !== deleted);
      }
      return { data };
    });
  }

  render() {
    const { data } = this.state;

    return (
      <Paper className="scheduler-block">
        <Scheduler
          data={data}
          height={900}>
          <EditingState onCommitChanges={this.commitChanges} />
          <ViewState defaultCurrentDate="2021-04-24" />

          <MonthView
            timeTableCellComponent={TimeTableCell}
            dayScaleCellComponent={DayScaleCell}
          />

          <Appointments
            appointmentComponent={Appointment}
            appointmentContentComponent={AppointmentContent}
          />

          <Toolbar flexibleSpaceComponent={FlexibleSpace} />
          <DateNavigator />

          <EditRecurrenceMenu />
          <AppointmentTooltip showCloseButton />
          <AppointmentForm />
        </Scheduler>

      </Paper>
    );
  }
}
