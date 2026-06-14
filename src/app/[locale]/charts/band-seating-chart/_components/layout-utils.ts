export const VIEW_BOX_WIDTH = 900;
export const VIEW_BOX_HEIGHT = 640;
export const CHART_CENTER_X = VIEW_BOX_WIDTH / 2;
export const CHART_CENTER_Y = 332;

export const ARC_HALF_SPAN_DEGREES = 90;
const STAGE_WIDTH = 150;
const STAGE_HEIGHT = 90;
const TARGET_MIN_ROW_RADIUS = 208;
const CANVAS_PADDING = 20;
const LABEL_GAP = 6;
const LABEL_RESERVED_WIDTH = 22;

type SeatingSeat = {
  id: string;
  x: number;
  y: number;
};

type ChartPoint = {
  x: number;
  y: number;
};

type SeatingRowGeometry = {
  id: string;
  label: string;
  seatCount: number;
  radius: number;
  seats: SeatingSeat[];
  labelPosition: {
    x: number;
    y: number;
  };
  arcStart: {
    x: number;
    y: number;
  };
  arcEnd: {
    x: number;
    y: number;
  };
};

export type SeatingGeometry = {
  rows: SeatingRowGeometry[];
  totalSeats: number;
  stage: {
    x: number;
    y: number;
    width: number;
    height: number;
    rotation: number;
  };
};

type SeatingRowInput = {
  rowLabel: string;
  seatCount: number;
};

type SeatingSettingsInput = {
  rotation: number;
  rowGap: number;
  seatSize: number;
};

function toRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

export function normalizeRotation(rotation: number) {
  const normalized = rotation % 360;
  return normalized < 0 ? normalized + 360 : normalized;
}

function polarToCartesian(
  radius: number,
  degrees: number,
  center: ChartPoint
): ChartPoint {
  const radians = toRadians(degrees);

  return {
    x: center.x + radius * Math.cos(radians),
    y: center.y + radius * Math.sin(radians),
  };
}

function getAnglesInSweep(start: number, end: number) {
  const criticalAngles = [0, 90, 180, 270];
  const angles = [start, end];

  criticalAngles.forEach((angle) => {
    let candidate = angle;
    while (candidate < start) {
      candidate += 360;
    }

    if (candidate <= end) {
      angles.push(candidate);
    }
  });

  return angles;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getRadiusLimit(range: {
  minBound: number;
  maxBound: number;
  minProjection: number;
  maxProjection: number;
}) {
  const projectionSpan = range.maxProjection - range.minProjection;

  if (projectionSpan <= 0) {
    return Number.POSITIVE_INFINITY;
  }

  return (range.maxBound - range.minBound) / projectionSpan;
}

export function getStageShortcutRotation(
  direction: 'top' | 'right' | 'bottom' | 'left'
) {
  switch (direction) {
    case 'top':
      return 270;
    case 'right':
      return 0;
    case 'bottom':
      return 90;
    case 'left':
      return 180;
    default:
      return 90;
  }
}

export function buildSeatingGeometry(
  rows: SeatingRowInput[],
  settings: SeatingSettingsInput
): SeatingGeometry {
  const normalizedRotation = normalizeRotation(settings.rotation);
  const arcCenter = normalizedRotation + 180;
  const arcStart = arcCenter - ARC_HALF_SPAN_DEGREES;
  const arcEnd = arcCenter + ARC_HALF_SPAN_DEGREES;

  const validRows = rows
    .map((row, index) => ({
      id: `row-${index}`,
      label: row.rowLabel.trim(),
      seatCount: Math.max(0, Math.round(Number(row.seatCount) || 0)),
    }))
    .filter((row) => row.label && row.seatCount > 0);

  const rowCount = validRows.length;
  const desiredOuterRadius =
    TARGET_MIN_ROW_RADIUS + Math.max(rowCount - 1, 0) * settings.rowGap;
  const sweepAngles = getAnglesInSweep(arcStart, arcEnd);
  const projections = sweepAngles.map((angle) => {
    const radians = toRadians(angle);
    return {
      cos: Math.cos(radians),
      sin: Math.sin(radians),
    };
  });
  const cosValues = projections.map((projection) => projection.cos);
  const sinValues = projections.map((projection) => projection.sin);
  const minCos = Math.min(...cosValues);
  const maxCos = Math.max(...cosValues);
  const minSin = Math.min(...sinValues);
  const maxSin = Math.max(...sinValues);
  const minXBound =
    CANVAS_PADDING + LABEL_RESERVED_WIDTH + settings.seatSize + LABEL_GAP;
  const maxXBound = VIEW_BOX_WIDTH - CANVAS_PADDING - settings.seatSize / 2;
  const minYBound = CANVAS_PADDING + settings.seatSize / 2;
  const maxYBound = VIEW_BOX_HEIGHT - CANVAS_PADDING - settings.seatSize / 2;
  const maxOuterRadius = Math.min(
    getRadiusLimit({
      minBound: minXBound,
      maxBound: maxXBound,
      minProjection: minCos,
      maxProjection: maxCos,
    }),
    getRadiusLimit({
      minBound: minYBound,
      maxBound: maxYBound,
      minProjection: minSin,
      maxProjection: maxSin,
    })
  );
  const outerRadius = Math.min(desiredOuterRadius, maxOuterRadius);
  const baseRadius = Math.max(
    48,
    outerRadius - Math.max(rowCount - 1, 0) * settings.rowGap
  );
  const chartCenter = {
    x: clamp(
      (minXBound - minCos * outerRadius + (maxXBound - maxCos * outerRadius)) /
        2,
      CHART_CENTER_X - 110,
      CHART_CENTER_X + 110
    ),
    y: clamp(
      (minYBound - minSin * outerRadius + (maxYBound - maxSin * outerRadius)) /
        2,
      CHART_CENTER_Y - 110,
      CHART_CENTER_Y + 110
    ),
  };
  const stageDistance = STAGE_HEIGHT / 2;
  const stageCenter = polarToCartesian(stageDistance, arcCenter, chartCenter);

  const geometryRows = validRows.map((row, rowIndex) => {
    const radius = baseRadius + rowIndex * settings.rowGap;
    const seats = Array.from({ length: row.seatCount }, (_, seatIndex) => {
      const angle =
        row.seatCount === 1
          ? arcCenter
          : arcStart +
            (seatIndex / Math.max(row.seatCount - 1, 1)) * (arcEnd - arcStart);
      const position = polarToCartesian(radius, angle, chartCenter);

      return {
        id: `${row.id}-seat-${seatIndex}`,
        x: position.x,
        y: position.y,
      };
    });

    const arcStartPoint = polarToCartesian(radius, arcStart, chartCenter);
    const arcEndPoint = polarToCartesian(radius, arcEnd, chartCenter);
    const labelPosition = {
      x: arcStartPoint.x - settings.seatSize - LABEL_GAP,
      y: arcStartPoint.y,
    };

    return {
      ...row,
      radius,
      seats,
      labelPosition,
      arcStart: arcStartPoint,
      arcEnd: arcEndPoint,
    };
  });

  return {
    rows: geometryRows,
    totalSeats: geometryRows.reduce((sum, row) => sum + row.seatCount, 0),
    stage: {
      x: stageCenter.x,
      y: stageCenter.y,
      width: STAGE_WIDTH,
      height: STAGE_HEIGHT,
      rotation: normalizedRotation + 90,
    },
  };
}
