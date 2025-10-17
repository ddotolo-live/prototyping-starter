# Project Details

## Color System

The project uses a comprehensive color system aligned with the product design specifications. All color variables use camelCase naming conventions for consistency with TypeScript/JavaScript usage.

### Color Categories

#### Semantic Colors (Light/Dark)
- **Foreground**: `fg0` through `fg5` - Text and content colors with varying opacity levels
- **Accent**: `fgAccent1`, `fgAccent2` - Primary brand colors (Blue/Cyan)
- **Success**: `fgSuccess` - Success state colors (Green)
- **Moderate**: `fgModerate` - Warning/moderate state colors (Amber)
- **Serious**: `fgSerious1`, `fgSerious2` - Error/critical state colors (Red)

#### Background Colors
- **Base**: `bg1`, `bg2`, `bg3` - Background layers with increasing depth
- **Accent**: `bgAccent1`, `bgAccent2` - Accent background states
- **Success**: `bgSuccess1`, `bgSuccess2` - Success background states
- **Moderate**: `bgModerate1`, `bgModerate2` - Warning background states
- **Serious**: `bgSerious1`, `bgSerious2` - Error background states

#### Separator Colors
- **Base**: `separator1`, `separator2` - Default border/divider colors
- **Accent**: `separatorAccent` - Accent borders
- **Success**: `separatorSuccess` - Success state borders
- **Moderate**: `separatorModerate` - Warning state borders
- **Serious**: `separatorSerious1`, `separatorSerious2` - Error state borders

#### Chart Colors
- `chart1` through `chart8` - Data visualization colors
- `chartSerious` - Critical data visualization color

#### Code Colors
- `codeAccent`, `codeAccent2` - Code syntax highlighting (Blue/Cyan)
- `codePurple`, `codePurple2` - Code syntax highlighting (Purple)
- `codeAmber`, `codeAmber2` - Code syntax highlighting (Amber)
- `codeGreen`, `codeGreen2` - Code syntax highlighting (Green)
- `codeRed`, `codeRed2` - Code syntax highlighting (Red)

### Usage in Tailwind

Colors are accessible via Tailwind utility classes using the camelCase names:
```tsx
<div className="bg-bg1 text-fg0 border-separator1">
  <span className="text-fgAccent1">Accent Text</span>
  <button className="bg-bgSuccess1 text-fgSuccess">Success</button>
</div>
```

### Color Source

All color values are defined in `app/globals.css` with both light (`:root`) and dark (`.dark`) theme variants. Raw color values are maintained in `colors/raw-colors.ts` for reference.

### Component Token Alignment

All components have been updated to use the new camelCase token naming convention:
- ✅ Custom components (`components/custom/`)
- ✅ UI components (`components/ui/`)

Token references now consistently use camelCase (e.g., `text-fgAccent1`, `bg-bgSerious1`, `border-separator1`) matching the CSS variable definitions.

## Auto-Save & Edit History

The ConfigPanel component now includes automatic saving functionality with visual feedback and edit history tracking.

### Features

#### Save State Indicator
- **Visual Feedback**: Displays "Saving changes..." and "All changes saved" messages in the top bar
- **Timing**: Shows "Saving changes..." for 1.5s, then "All changes saved" for 1.5s before disappearing
- **Styling**: Italic text in `text-fg3` color matching design specifications

#### Debounced History Tracking
- **Automatic Grouping**: Changes made within 3 seconds are grouped into a single history entry
- **Smart Descriptions**: Generates human-readable descriptions based on changed fields
  - Single field: "Updated agent name"
  - Multiple fields: "Updated agent name, voice, and language"
- **Field Mapping**: All config fields have descriptive labels for history entries

### Implementation

#### ConfigPanel Component
```tsx
<ConfigPanel
  // ... existing config props
  historyItems={historyItems}
  onAddHistory={handleAddHistory}
  currentUserEmail="user@example.com"
/>
```

#### Parent Component Setup
```tsx
const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);

const handleAddHistory = (editName: string) => {
  const newHistoryItem: HistoryItem = {
    id: Date.now().toString(),
    editName,
    userEmail: "user@example.com",
    timestamp: "Just now",
  };
  setHistoryItems((prev) => [newHistoryItem, ...prev]);
};
```

#### EditHistoryPanel Component
- **Flexible Data Source**: Accepts `historyItems` prop or falls back to mock data
- **Empty State**: Shows "No edit history yet" message when no items exist
- **Current Implementation**: View-only panel showing history chronologically

### Technical Details

#### Save State Flow
1. User changes any field → state changes to "saving"
2. After 1.5s → state changes to "saved"
3. After another 1.5s → state returns to "idle"
4. New changes during saved/saving → restart timer

#### History Entry Flow
1. Field change tracked in Set
2. 3 second inactivity timer starts
3. On timer completion → generate description and create history entry
4. Clear tracked changes
5. New changes → restart timer

#### Tracked Fields
All ConfigPanel fields are tracked including:
- Identity: name, system instructions, welcome message
- Voice & Models: language, pipeline mode, voice, models, API keys
- Behavior: greeting settings, tools configuration

### Future Enhancements
- Implement revert functionality in EditHistoryPanel
- Add visual diff between history versions
- Support for collaborative editing with multiple users
- Persist history to backend/database