/**
 * Component Style Variants for RoofER Training System
 *
 * Consistent styling patterns for reusable components
 */

import { colors, spacing, borderRadius, typography, shadows } from './tokens';

// Button Variants
export const buttonVariants = {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.md,
    fontWeight: typography.fontWeight.medium,
    transition: 'all 150ms ease-in-out',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
    textDecoration: 'none',
  },

  size: {
    sm: {
      height: '2rem',
      paddingLeft: spacing[3],
      paddingRight: spacing[3],
      fontSize: typography.fontSize.sm,
      gap: spacing[1.5],
    },
    md: {
      height: '2.5rem',
      paddingLeft: spacing[4],
      paddingRight: spacing[4],
      fontSize: typography.fontSize.base,
      gap: spacing[2],
    },
    lg: {
      height: '3rem',
      paddingLeft: spacing[6],
      paddingRight: spacing[6],
      fontSize: typography.fontSize.lg,
      gap: spacing[2.5],
    },
  },

  variant: {
    primary: {
      backgroundColor: colors.primary[500],
      color: colors.text.inverse,
      '&:hover': {
        backgroundColor: colors.primary[600],
        boxShadow: shadows.md,
      },
      '&:focus': {
        backgroundColor: colors.primary[600],
        boxShadow: `0 0 0 2px ${colors.primary[200]}`,
      },
      '&:active': {
        backgroundColor: colors.primary[700],
      },
      '&:disabled': {
        backgroundColor: colors.neutral[300],
        color: colors.text.disabled,
        cursor: 'not-allowed',
      },
    },
    secondary: {
      backgroundColor: colors.secondary[500],
      color: colors.text.inverse,
      '&:hover': {
        backgroundColor: colors.secondary[600],
        boxShadow: shadows.md,
      },
      '&:focus': {
        backgroundColor: colors.secondary[600],
        boxShadow: `0 0 0 2px ${colors.secondary[200]}`,
      },
      '&:active': {
        backgroundColor: colors.secondary[700],
      },
      '&:disabled': {
        backgroundColor: colors.neutral[300],
        color: colors.text.disabled,
        cursor: 'not-allowed',
      },
    },
    outline: {
      backgroundColor: 'transparent',
      color: colors.primary[600],
      border: `1px solid ${colors.primary[500]}`,
      '&:hover': {
        backgroundColor: colors.primary[50],
        borderColor: colors.primary[600],
      },
      '&:focus': {
        backgroundColor: colors.primary[50],
        borderColor: colors.primary[600],
        boxShadow: `0 0 0 2px ${colors.primary[200]}`,
      },
      '&:active': {
        backgroundColor: colors.primary[100],
      },
      '&:disabled': {
        backgroundColor: 'transparent',
        color: colors.text.disabled,
        borderColor: colors.neutral[300],
        cursor: 'not-allowed',
      },
    },
    ghost: {
      backgroundColor: 'transparent',
      color: colors.text.primary,
      '&:hover': {
        backgroundColor: colors.neutral[100],
      },
      '&:focus': {
        backgroundColor: colors.neutral[100],
        boxShadow: `0 0 0 2px ${colors.neutral[300]}`,
      },
      '&:active': {
        backgroundColor: colors.neutral[200],
      },
      '&:disabled': {
        backgroundColor: 'transparent',
        color: colors.text.disabled,
        cursor: 'not-allowed',
      },
    },
  },
} as const;

// Input Field Variants
export const inputVariants = {
  base: {
    display: 'block',
    width: '100%',
    borderRadius: borderRadius.md,
    border: `1px solid ${colors.border.primary}`,
    backgroundColor: colors.surface.primary,
    color: colors.text.primary,
    fontSize: typography.fontSize.base,
    lineHeight: typography.lineHeight.normal,
    transition: 'all 150ms ease-in-out',
    '&::placeholder': {
      color: colors.text.tertiary,
    },
    '&:hover': {
      borderColor: colors.border.secondary,
    },
    '&:focus': {
      outline: 'none',
      borderColor: colors.primary[500],
      boxShadow: `0 0 0 2px ${colors.primary[200]}`,
    },
    '&:disabled': {
      backgroundColor: colors.neutral[100],
      color: colors.text.disabled,
      cursor: 'not-allowed',
    },
  },

  size: {
    sm: {
      height: '2rem',
      paddingLeft: spacing[2.5],
      paddingRight: spacing[2.5],
      fontSize: typography.fontSize.sm,
    },
    md: {
      height: '2.5rem',
      paddingLeft: spacing[3],
      paddingRight: spacing[3],
      fontSize: typography.fontSize.base,
    },
    lg: {
      height: '3rem',
      paddingLeft: spacing[4],
      paddingRight: spacing[4],
      fontSize: typography.fontSize.lg,
    },
  },

  state: {
    error: {
      borderColor: colors.error[500],
      '&:focus': {
        borderColor: colors.error[500],
        boxShadow: `0 0 0 2px ${colors.error[200]}`,
      },
    },
    success: {
      borderColor: colors.success[500],
      '&:focus': {
        borderColor: colors.success[500],
        boxShadow: `0 0 0 2px ${colors.success[200]}`,
      },
    },
  },
} as const;

// Card Variants
export const cardVariants = {
  base: {
    backgroundColor: colors.surface.primary,
    borderRadius: borderRadius.lg,
    border: `1px solid ${colors.border.primary}`,
    boxShadow: shadows.sm,
    overflow: 'hidden',
  },

  variant: {
    default: {
      padding: spacing[6],
    },
    compact: {
      padding: spacing[4],
    },
    elevated: {
      boxShadow: shadows.lg,
      border: 'none',
    },
    outlined: {
      boxShadow: 'none',
      border: `1px solid ${colors.border.secondary}`,
    },
    interactive: {
      cursor: 'pointer',
      transition: 'all 150ms ease-in-out',
      '&:hover': {
        boxShadow: shadows.md,
        transform: 'translateY(-1px)',
      },
    },
  },
} as const;

// Badge Variants
export const badgeVariants = {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: borderRadius.full,
    fontWeight: typography.fontWeight.medium,
    fontSize: typography.fontSize.xs,
    lineHeight: '1',
    whiteSpace: 'nowrap',
  },

  size: {
    sm: {
      height: '1.25rem',
      paddingLeft: spacing[2],
      paddingRight: spacing[2],
    },
    md: {
      height: '1.5rem',
      paddingLeft: spacing[2.5],
      paddingRight: spacing[2.5],
    },
    lg: {
      height: '1.75rem',
      paddingLeft: spacing[3],
      paddingRight: spacing[3],
      fontSize: typography.fontSize.sm,
    },
  },

  variant: {
    primary: {
      backgroundColor: colors.primary[100],
      color: colors.primary[700],
    },
    secondary: {
      backgroundColor: colors.secondary[100],
      color: colors.secondary[700],
    },
    success: {
      backgroundColor: colors.success[100],
      color: colors.success[700],
    },
    warning: {
      backgroundColor: colors.warning[100],
      color: colors.warning[700],
    },
    error: {
      backgroundColor: colors.error[100],
      color: colors.error[700],
    },
    neutral: {
      backgroundColor: colors.neutral[100],
      color: colors.neutral[700],
    },
  },
} as const;

// Progress Bar Variants
export const progressVariants = {
  base: {
    width: '100%',
    backgroundColor: colors.neutral[200],
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },

  size: {
    sm: {
      height: '0.25rem',
    },
    md: {
      height: '0.5rem',
    },
    lg: {
      height: '0.75rem',
    },
  },

  fill: {
    height: '100%',
    backgroundColor: colors.primary[500],
    borderRadius: borderRadius.full,
    transition: 'width 300ms ease-in-out',
  },
} as const;

// Alert Variants
export const alertVariants = {
  base: {
    padding: spacing[4],
    borderRadius: borderRadius.md,
    border: '1px solid',
    display: 'flex',
    alignItems: 'flex-start',
    gap: spacing[3],
  },

  variant: {
    info: {
      backgroundColor: colors.primary[50],
      borderColor: colors.primary[200],
      color: colors.primary[800],
    },
    success: {
      backgroundColor: colors.success[50],
      borderColor: colors.success[200],
      color: colors.success[800],
    },
    warning: {
      backgroundColor: colors.warning[50],
      borderColor: colors.warning[200],
      color: colors.warning[800],
    },
    error: {
      backgroundColor: colors.error[50],
      borderColor: colors.error[200],
      color: colors.error[800],
    },
  },
} as const;

// Modal Variants
export const modalVariants = {
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: colors.surface.overlay,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing[4],
    zIndex: 1400,
  },

  content: {
    backgroundColor: colors.surface.primary,
    borderRadius: borderRadius.lg,
    boxShadow: shadows['2xl'],
    maxWidth: '32rem',
    width: '100%',
    maxHeight: '90vh',
    overflow: 'auto',
  },

  header: {
    padding: spacing[6],
    paddingBottom: spacing[4],
    borderBottom: `1px solid ${colors.border.primary}`,
  },

  body: {
    padding: spacing[6],
    paddingTop: spacing[4],
    paddingBottom: spacing[4],
  },

  footer: {
    padding: spacing[6],
    paddingTop: spacing[4],
    borderTop: `1px solid ${colors.border.primary}`,
    display: 'flex',
    justifyContent: 'flex-end',
    gap: spacing[3],
  },
} as const;
