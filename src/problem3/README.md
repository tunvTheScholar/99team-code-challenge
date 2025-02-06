# 🤢 Problem 3: Messy React

## Issues

1. Type Safety Issues:

Using `any` type for blockchain parameter in getPriority
Inconsistent balance types between WalletBalance and FormattedWalletBalance in sorting/filtering
Missing type definition for 'blockchain' in WalletBalance interface

2. Logic Errors:

Filter logic is incorrect: uses undefined lhsPriority instead of balancePriority
Filter returns true for amounts <= 0, which seems inverse of intended logic
Sort function doesn't handle equal priorities
Sort function doesn't consider amount or other secondary sorting criteria

3. Performance Issues:

Multiple iterations over balances (filter -> sort -> map -> map)
Redundant getPriority calls in sort function
Unnecessary spreading of props
Prices dependency in useMemo isn't used in the calculation

4. React Best Practices:

Using index as key in mapped components
Unused prices in useMemo dependency array
Mixing formatted and unformatted balance types
BoxProps interface extension isn't utilized effectively

5. Code Structure:

getPriority function could be a constant lookup object
Blockchain types should be a union type
Missing error boundaries and loading states
Missing proper prop validation

## Improve

1. Removed Magic Number:

Replaced -99 with meaningful enum values
Added PriorityValues enum for clear intent
Separate UNSUPPORTED and DEFAULT values for different cases

2. Added Utility Functions:

getBlockchainPriority for consistent priority lookup
formatBalance for consistent balance formatting
Better encapsulation of logic

3. Improved Error Handling:

Added empty state handling
More explicit unsupported blockchain handling
Clearer distinction between unsupported and default cases

4. Code Clarity:

More descriptive variable names
Clear separation between types, constants, and logic
Better documentation of intent

5. Additional Improvements:

Maintained all previous type safety improvements
Kept the performance optimizations
Retained the proper React patterns
Single file for easier maintenance when needed
